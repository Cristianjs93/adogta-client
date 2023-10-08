import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const status = useSelector((state) => state.general.status);
  const { t } = useTranslation();

  if (status === 'LOADING') return <p>{t('privateRoute.loading')}</p>;

  return (
    <Route
      {...rest}
      render={(props) =>
        status === 'AUTHENTICATED' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}

export default PrivateRoute;
