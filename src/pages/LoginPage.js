import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { authUser, resetError } from '../store/toolkit/slices/generalSlice';
import { Link } from 'react-router-dom';
import '../assets/styles/LoginPage.css';

const LoginPage = () => {
  const form = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    isInvalid: false,
    values: {},
  });

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const error = useSelector((state) => state.general.error);

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: { ...formState.values, [event.target.name]: event.target.value },
    }));
  };

  const handleVerifyEmail = (event) => {
    const check = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      event.target.value
    );
    setFormState((formState) => ({
      ...formState,
      isInvalid: !check,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      authUser({
        email: formState.values.email || '',
        password: formState.values.password || '',
      })
    );
  };

  return (
    <section className='login'>
      <section className='login__container'>
        <h2>{t('loginPage.login')}</h2>
        {formState.isInvalid && <span>*{t('loginPage.error.email')}</span>}
        <form
          className='login__container--form'
          ref={form}
          data-testid='loginForm'>
          <input
            name='email'
            className='input'
            type='text'
            placeholder={t('loginPage.email.placeholder')}
            onChange={handleChange}
            onBlur={handleVerifyEmail}
            data-testid='email'
          />
          <input
            name='password'
            className='input'
            type='password'
            placeholder={t('loginPage.password.placeholder')}
            onChange={handleChange}
            data-testid='password'
          />

          <button
            type='submit'
            className='button'
            onClick={handleSubmit}
            disabled={formState.isInvalid}
            data-testid='loginButton'>
            {t('loginPage.login')}
          </button>
        </form>
        {!!error && <span>{error}</span>}
        <p className='login__container--register'>
          {t('loginPage.question')}{' '}
          <Link to='/signup'>{t('loginPage.signUp')}</Link>
        </p>
      </section>
    </section>
  );
};

export default LoginPage;
