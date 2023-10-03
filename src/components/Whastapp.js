import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import '../assets/styles/Whatsapp.css';

const Whastapp = ({ role }) => {
  return (
    <a
      href={
        role === 'user'
          ? "https://wa.me/+573185755283?text=I'm%20interested%20in%20adopting%20a%20pet%20or%20donating"
          : 'https://wa.me/+573185755283?text=Hi!%20I%20need%20help'
      }
      rel='noreferrer'
      className='whatsappfloat'
      target='_blank'
      aria-label='whastapp'>
      {' '}
      <IoLogoWhatsapp className='whatsappfloat__IoLogoWhatsapp' />
    </a>
  );
};

export default Whastapp;
