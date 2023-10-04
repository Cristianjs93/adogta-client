import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { verifiedEmail } from '../store/toolkit/slices/generalSlice';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import history from '../history';

function AuthVerified() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const { token } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(verifiedEmail(token));
  }, [dispatch, token]);

  const emailWasVerified = () => {
    MySwal.fire({
      title: <strong>{t('authVerified.email')}</strong>,
      html: `<i>${t('authVerified.redirected')}...</i>`,
      icon: 'success',
    });
    history.push('/');
  };
  return <div>{emailWasVerified()}</div>;
}

export default AuthVerified;
