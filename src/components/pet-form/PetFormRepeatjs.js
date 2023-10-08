import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import beWare from '../../assets/images/29407-warning-icon.json';

function PetFormRepeat() {
  const { t } = useTranslation();

  return (
    <div className='petform__successContainer'>
      <h1 className='petform__successContainer--success'>
        {t('petFormRepeat.message')}
      </h1>
      <Player
        className='petform__successContainer--img'
        autoplay
        loop
        src={beWare}
      />
      <Link to='/'>
        <button className='petform__successContainer--button'>
          {t('petFormSuccess.button')}
        </button>
      </Link>
    </div>
  );
}

export default PetFormRepeat;
