import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/PrimaryButton';
import { registerUser } from '../store/toolkit/slices/generalSlice';
import '../assets/styles/RegisterForm.css';

function RegisterPage() {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onBlur' });

  const dispatch = useDispatch();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  return (
    <section className='register'>
      <div className='register__container'>
        <h2 className='register__container--title'>
          {t('registerPage.signUp')}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='register__container--form'
          data-testid='form'>
          {errors?.name?.type === 'required' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error.name')}
            </p>
          )}
          {errors?.name?.type === 'maxLength' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error2.name')}
            </p>
          )}
          <input
            type='text'
            name='name'
            placeholder={t('registerPage.name.placeholder')}
            className='form__field'
            data-testid='name'
            {...register('name', {
              required: true,
              maxLength: 40,
            })}
          />
          {errors?.email?.type === 'required' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error.email')}
            </p>
          )}
          {errors?.email?.type === 'pattern' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error2.email')}
            </p>
          )}
          <input
            type='email'
            placeholder={t('loginPage.email.placeholder')}
            name='email'
            className='form__field'
            data-testid='email'
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />

          {errors?.password?.type === 'required' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error.password')}
            </p>
          )}
          {errors?.password?.type === 'pattern' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error2.password')}
            </p>
          )}
          <input
            type='password'
            placeholder={t('loginPage.password.placeholder')}
            name='password'
            className='form__field'
            data-testid='password'
            {...register('password', {
              required: true,
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            })}
          />
          {errors?.confirmPassword?.type === 'required' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error.confirm.password')}
            </p>
          )}
          {errors?.confirmPassword && (
            <p className='register__container--form--errors'>
              {t('registerPage.error2.confirm.password')}
            </p>
          )}
          <input
            type='password'
            placeholder={t('registerPage.confirm.password.placeholder')}
            name='confirmPassword'
            className='form__field'
            data-testid='confirmPassword'
            {...register('confirmPassword', {
              required: true,
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
          />
          <h3 className='register__container--subtitle'>
            {t('registerPage.signUp.as')}
          </h3>
          {errors?.role?.type === 'required' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error.role')}
            </p>
          )}
          <div className='register__container--form--options'>
            <label className='register__container--form--options--label'>
              {t('registerPage.user.role')}
              <input
                type='radio'
                name='user'
                value='user'
                data-testid='user'
                className='register__container--form--options--input'
                {...register('role', {
                  required: true,
                })}
              />
            </label>
            <label className='register__container--form--options--label'>
              {t('registerPage.foundation.role')}
              <input
                type='radio'
                name='foundation'
                value='foundation'
                data-testid='foundation'
                className='register__container--form--options--input'
                {...register('role', {
                  required: true,
                })}
              />
            </label>
          </div>
          {errors?.terms?.type === 'required' && (
            <p className='register__container--form--errors'>
              {t('registerPage.error.terms')}
            </p>
          )}
          <label className='termsAndConditions register__container--form--options--label'>
            <input
              type='checkbox'
              name='terms'
              className='termsAndConditions--input'
              data-testid='terms'
              {...register('terms', {
                required: true,
              })}
            />
            {t('registerPage.agree.terms')}{' '}
            <a className='termsAndConditions--link' href='/'>
              {' '}
              {t('registerPage.terms')}
            </a>
          </label>
          <div className='buttomForm'>
            <PrimaryButton
              children={'Sign up'}
              color={'primaryButton registerForm'}
              data-testid='submitButton'
            />
          </div>
        </form>
        <h4 className='register__container--Endtitle'>
          {t('registerPage.already.member')}{' '}
          <Link to='/login'>{t('loginPage.login')}</Link>
        </h4>
      </div>
    </section>
  );
}

export default RegisterPage;
