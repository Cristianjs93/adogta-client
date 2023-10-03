import { useState, createContext } from 'react';
import i18n from '../../i18n';

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        handleLanguageChange,
      }}>
      {children}
    </LocaleContext.Provider>
  );
};
