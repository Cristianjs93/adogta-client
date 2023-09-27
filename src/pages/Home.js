import React from 'react';
import AboutSection from '../components/AboutSection';
import Info from '../components/Info';
import HelpUsSection from '../components/HelpUs';
import Whastapp from '../components/Whastapp';
// import { selectGeneral } from '../store/toolkit/slices/generalSlice';
import { useSelector } from 'react-redux';

function Home() {
  const general = useSelector((state) => state.general);
  return (
    <div data-testid='Home'>
      <button onClick={() => console.log(general)}>general</button>
      <AboutSection />
      <Info />
      <HelpUsSection />
      <Whastapp />
    </div>
  );
}

export default Home;
