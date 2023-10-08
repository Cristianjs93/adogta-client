import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from '../components/slider/Slider';
import { SliderData } from './slider/SliderData';
import '../assets/styles/Info.css';

function Info() {
  const { t } = useTranslation();

  return (
    <div className='infoContainer' id='info'>
      <div className='infoContainer__wrapper'>
        <div className='infoContainer__wrapper--slider'>
          <Slider
            className='infoContainer__wrapper--slides'
            slides={SliderData}
          />
        </div>
        <div className='infoContainer__wrapper--textWrapper'>
          <div className='infoContainer__wrapper--topLine'>
            {t('info.connect')}
          </div>
          <h1 className='infoContainer__wrapper--heading'>
            {t('info.signUp')}
          </h1>
          <p className='infoContainer__wrapper--subtitle'>
            {t('info.your.pet')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
