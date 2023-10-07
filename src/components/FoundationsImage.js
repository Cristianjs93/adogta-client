import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFoundation } from '../store/toolkit/slices/generalSlice';
import defaultImage from '../assets/images/foundation-default.jpg';
import position from '../assets/images/position.png';
import mail from '../assets/images/mail.png';
import telephone from '../assets/images/telephone.png';

const FoundationsImage = ({ id, photo_url, name, address, email, phone }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      setFoundation({
        id,
        photo_url,
        name,
        address,
        email,
        phone,
      })
    );
  };

  return (
    <Link
      to={'/foundations/' + id + '/pets?page=1'}
      className='link-foundations'
      onClick={handleSubmit}>
      <figure className='photo-foundations' data-testid='foundationsCard'>
        <img
          className='image-foundations'
          src={
            !!photo_url && photo_url !== 'undefined' ? photo_url : defaultImage
          }
          alt='pet'
        />
        <h2 className='subtitle-foundations'> {name} </h2>
        <h2 className='text-foundations'>
          <img
            id='logo'
            src={position}
            className='icons-foundations'
            alt='icon'
          />
          {address}
        </h2>
        <h2 className='text-foundations'>
          <img id='logo' src={mail} className='icons-foundations' alt='icon' />
          {email}
        </h2>
        <h2 className='text-foundations'>
          <img
            id='logo'
            src={telephone}
            className='icons-foundations'
            alt='icon'
          />
          {phone}
        </h2>
      </figure>
    </Link>
  );
};

export default FoundationsImage;
