import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Dog3 from '../assets/images/Error Naughty Dog.svg';
import '../assets/styles/NotFound.css';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className='notFound__container'>
      <div className='notFound__container--wrapper'>
        <div className='notFound__container--imageWrapper'>
          <object
            className='notFound__container--image'
            type='image/svg+xml'
            data={Dog3}>
            svg-animation
          </object>
        </div>
        <div className='notFound__container--textWrapper'>
          <h1 className='notFound__container--title'>{t('notFound.status')}</h1>
          <p className='notFound__container--subtitle'>
            {t('notFound.message')}
          </p>
        </div>
        <Link className='notFound__container--btnWrapper' to='/'>
          <button className='notFound__container--button'>
            {t('petFormSuccess.button')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
