import React, { useContext } from 'react';
import { LocaleContext } from '../store/context/LocaleContext';
import UK from '../assets/images/UK.png';
import SP from '../assets/images/SP.png';
import '../assets/styles/LanguageSelector.css';

const LanguageSelector = () => {
  const { locale, handleLanguageChange } = useContext(LocaleContext);

  return (
    <div className='navBar__language-container'>
      {locale === 'en' ? (
        <img src={UK} alt='SP' className='navBar__icon' />
      ) : (
        <img src={SP} alt='SP' className='navBar__icon' />
      )}
      <select
        className='navBar__language'
        value={locale}
        onChange={handleLanguageChange}>
        <option value='en' className='navBar__option'>
          EN
        </option>
        <option value='es' className='navBar__option'>
          ES
        </option>
      </select>
    </div>
  );
};

export default LanguageSelector;
