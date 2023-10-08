import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  listUserRequests,
  updateUserProfile,
} from '../store/toolkit/slices/generalSlice';
import AdoptionRequest from '../components/AdoptionRequest';
import { PrimaryButton } from '../components/PrimaryButton';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FaUserCircle } from 'react-icons/fa';
import '../assets/styles/UserProfile.css';

function Profile() {
  const { name, email, address, phoneNumber, _id, role, photoUrl } =
    useSelector((state) => state.general.user);

  const dispatch = useDispatch();

  const [updateProfile, setUpdateProfile] = useState({
    _id,
    name,
    email,
    address,
    phoneNumber,
    photoUrl,
    role,
    imageFile: null,
  });

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(listUserRequests(_id));
  }, [_id, dispatch]);

  const requests = useSelector((state) => state.general.userRequests) || [];

  const MySwal = withReactContent(Swal);

  const setImage = (newImage) => {
    setUpdateProfile((prevState) => ({
      ...prevState,
      photoUrl: newImage,
      imageFile: URL.createObjectURL(newImage),
    }));
  };

  const handlePhoto = (event) => {
    const newImage = event.target.files[0];
    if (newImage) {
      setImage(newImage);
    }
  };

  const onChange = (event) => {
    event.preventDefault();
    setUpdateProfile((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserProfile(updateProfile));
    MySwal.fire({
      title: <strong>{t('userProfile.updated.message')}</strong>,
      icon: 'success',
    });
  };

  return (
    <section className='userProfile'>
      <div className='userProfile__container'>
        <h2 className='userProfile__container--title'>
          {t('userProfile.hello')} {name}!
        </h2>
        <form
          className='userProfile__container--form'
          onSubmit={handleSubmit}
          data-testid='form'>
          <i className='userProfile__container--image'>
            {!!updateProfile.photoUrl &&
            updateProfile.photoUrl !== 'undefined' ? (
              <img
                src={
                  updateProfile.imageFile
                    ? updateProfile.imageFile
                    : updateProfile.photoUrl
                }
                alt='Profile'
                className='userProfile__container--profileImg'
              />
            ) : (
              <FaUserCircle className='userProfile__container--avatar' />
            )}
          </i>
          <label
            htmlFor='imageUpload'
            className='updateProfilePic userProfile__container--inputs'>
            {t('userProfile.change.picture')}{' '}
          </label>
          <input
            type='file'
            id='imageUpload'
            name='imageUpload'
            accept='image/*'
            hidden
            onChange={handlePhoto}
            data-testid='imageUpload'
          />
          <input
            id='name'
            type='text'
            name='name'
            placeholder={name || t('registerPage.name.placeholder')}
            className='userProfile__container--inputs'
            onChange={onChange}
            required={name ? true : false}
            value={updateProfile.name}
            data-testid='name'
          />
          <input
            id='email'
            type='email'
            name='email'
            placeholder={t('registerPage.email.placeholder')}
            value={email}
            disabled
            className='userProfile__container--inputs'
          />
          <input
            id='address'
            type='text'
            name='address'
            placeholder={address || t('userProfile.address.placeholder')}
            className='userProfile__container--inputs'
            onChange={onChange}
            required={address ? true : false}
            value={updateProfile.address}
            data-testid='address'
          />
          <input
            id='phoneNumber'
            type='number'
            name='phoneNumber'
            placeholder={
              phoneNumber || t('userProfile.phoneNumber.placeholder')
            }
            className='userProfile__container--inputs'
            onChange={onChange}
            required={phoneNumber ? true : false}
            value={updateProfile.phoneNumber}
            data-testid='phoneNumber'
          />
          <PrimaryButton
            children={t('userProfile.button')}
            color={'primaryButton updateUser'}
          />
        </form>
      </div>
      {requests.length > 0 && (
        <>
          <h2 className='request-title'>{t('userProfile.adoption.request')}</h2>
          <section className='requests-list'>
            {requests.map((req) => (
              <AdoptionRequest
                key={req._id}
                request={req}
                handleReject={null}
                handleApprove={null}
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
}

export default Profile;
