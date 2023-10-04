import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Dog4 from '../../assets/images/54287-dogito.json';

const PetFormSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className='petform__successContainer' data-testid='success'>
      <h1 className='petform__successContainer--success'>
        {t('petFormSuccess.message')}
      </h1>
      <Player
        className='petform__successContainer--img'
        autoplay
        loop
        src={Dog4}
      />
      <Link to='/' data-testid='successButton'>
        <button className='petform__successContainer--button'>
          {t('petFormSuccess.button')}
        </button>
      </Link>
    </div>
  );
};

export default PetFormSuccess;
