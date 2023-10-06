import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getFoundationById } from '../store/toolkit/slices/generalSlice';
import DonationForm from '../components/DonationForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import i18n from '../i18n';
import '../assets/styles/Donation.css';

const STRIPE = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(STRIPE, {
  locale: i18n.language,
});

const Donation = () => {
  const { id: foundationId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getFoundationById(foundationId));
  }, [dispatch, foundationId]);

  const { foundation } = useSelector((state) => state.general);

  return (
    <div className={'petFormContainer petFormGrid'}>
      <div className='petFormContainer__content--left'>
        <img
          className='petFormContainer__content--left--img'
          src={foundation.photo_url}
          alt={foundation.name}
        />
        <h2 className='petFormContainer__content--left--text'>
          {t('donation.message')}
        </h2>
      </div>
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </div>
  );
};

export default Donation;
