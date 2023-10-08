import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usePetForm from './usePetForm';
import { useTranslation } from 'react-i18next';
import validateInfo from './validateInfo';

const PetFormSignUp = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = usePetForm(
    submitForm,
    validateInfo
  );

  const statePet = useSelector((state) => state.general.selectedPet);

  const [pet, setPet] = useState({
    name: '',
    photoUrl: '',
  });

  const { t } = useTranslation();

  useEffect(() => {
    setPet(statePet);
  }, [statePet]);

  return (
    <div className='petform__rightContainer' data-testid='petForm'>
      <form
        className='petform__rightContainerForm'
        onSubmit={handleSubmit}
        data-testid='petFormSubmit'>
        <h1>
          {t('petFormSignUp.closer')}
          {pet.name}
        </h1>

        <div className='petform__rightContainerForm--inputs'>
          <label
            className='petform__rightContainerForm--label'
            htmlFor='address'>
            {t('userProfile.address.placeholder')}
          </label>
          <input
            id='address'
            type='text'
            name='address'
            className='petform__rightContainerForm--input'
            placeholder={t('petFormSignUp.address.placeholder')}
            value={values.address}
            onChange={handleChange}
            data-testid='address'
          />
          {errors.address && <p>{errors.address}</p>}
        </div>
        <div className='petform__rightContainerForm--inputs'>
          <label
            className='petform__rightContainerForm--label'
            htmlFor='phoneNumber'>
            {t('userProfile.phoneNumber.placeholder')}
          </label>
          <input
            id='phoneNumber'
            type='phoneNumber'
            name='phoneNumber'
            className='petform__rightContainerForm--input'
            placeholder={t('petFormSignUp.phoneNumber.placeholder')}
            value={values.phoneNumber}
            onChange={handleChange}
            data-testid='phoneNumber'
          />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        </div>
        <div className='petform__rightContainerForm--inputs'>
          <label
            className='petform__rightContainerForm--label'
            htmlFor='textarea'>
            {t('petFormSignUp.description')}
          </label>
          <textarea
            id='description'
            name='description'
            col='100'
            row='200'
            className='petform__rightContainerForm--textarea'
            placeholder={t('petFormSignUp.description.placeholder')}
            value={values.description}
            onChange={handleChange}
            data-testid='description'
          />
          {errors.description && (
            <p data-testid='errors'>{errors.description}</p>
          )}
        </div>
        <button className='petform__rightContainerForm--button' type='submit'>
          {t('aboutSection.adopt.me')}
        </button>
      </form>
    </div>
  );
};

export default PetFormSignUp;
