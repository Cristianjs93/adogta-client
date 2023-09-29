import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetError } from '../store/toolkit/slices/generalSlice';
import AboutSection from '../components/AboutSection';
import Info from '../components/Info';
import HelpUsSection from '../components/HelpUs';
import Whastapp from '../components/Whastapp';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <div data-testid='Home'>
      <AboutSection />
      <Info />
      <HelpUsSection />
      <Whastapp />
    </div>
  );
}

export default Home;
