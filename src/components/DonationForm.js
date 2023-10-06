import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import paymentErrorHandler from '../utils/paymentErrorHandler';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from '../axios';
import '../assets/styles/DonationForm.css';

const DonationForm = () => {
  const { user, foundation } = useSelector((state) => state.general);
  const { t } = useTranslation();
  const elements = useElements();
  const stripe = useStripe();

  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState('');

  const MySwal = withReactContent(Swal);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const clearElements = () => {
    elements.getElement(CardNumberElement).clear();
    elements.getElement(CardExpiryElement).clear();
    elements.getElement(CardCvcElement).clear();
    setAmount('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!amount) {
        throw new Error(t('donationForm.error.amount'));
      }

      const addressElement = elements.getElement('address');
      const { value } = await addressElement.getValue();

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        billing_details: {
          ...value,
          email: user.email,
        },
        card: elements.getElement(
          CardNumberElement,
          CardExpiryElement,
          CardCvcElement
        ),
      });

      if (error) {
        return paymentErrorHandler(error);
      }

      const response = await axios.post(`/donate/payment`, {
        paymentMethod,
        amount: amount * 100,
        email: user.email,
      });

      if (!!response.data.message) {
        throw new Error(response.data.message);
      }

      clearElements();

      MySwal.fire({
        title: <strong>{t('donation.successful')}</strong>,
        icon: 'success',
      });
    } catch (error) {
      return MySwal.fire({
        title: <strong>{error.message}</strong>,
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='donationForm'>
      <h1 className='donationForm__foundation'>{foundation.name}</h1>
      <h2 className='donationForm__info'>{t('donationForm.info')}</h2>
      <form className='donationForm__form-container' onSubmit={handleSubmit}>
        <div>
          <label className='stripe-label'>{t('donationForm.card')}</label>
          <CardNumberElement
            className='stripe-input'
            options={{ showIcon: true }}
          />
        </div>
        <div>
          <label className='stripe-label'>{t('donationForm.expiration')}</label>
          <CardExpiryElement
            options={{
              placeholder: t('donationForm.expiration.placeholder'),
            }}
            className='stripe-input'
          />
        </div>
        <div>
          <label className='stripe-label'>{t('donationForm.cvc')}</label>
          <CardCvcElement className='stripe-input' />
        </div>
        <div>
          <label className='stripe-label'>{t('donationForm.amount')}</label>
          <input
            type='number'
            name='amount'
            className='stripe-input-amount'
            value={amount}
            onChange={handleChange}
            data-testid='description'
          />
        </div>
        <AddressElement
          options={{
            mode: 'billing',
            fields: {
              phone: 'always',
            },
            defaultValues: {
              name: user.name,
              phone: user.phoneNumber,
              address: {
                line1: user.address,
                line2: '',
                city: 'Bogota',
                state: 'CUN',
                postal_code: '110110',
                country: 'CO',
              },
            },
          }}
          className='stripe-input-address'
        />
        <button
          type='submit'
          className='petform__rightContainerForm--button'
          disabled={loading ? true : false}>
          {t('help.donate')}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
