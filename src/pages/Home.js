import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetError, loadUser } from '../store/toolkit/slices/generalSlice';
import AboutSection from '../components/AboutSection';
import Info from '../components/Info';
import HelpUsSection from '../components/HelpUs';
import Whastapp from '../components/Whastapp';

function Home() {
  const activeUser = useSelector((state) => state.general.user);

  const dispatch = useDispatch();
  const token = localStorage.getItem('AUTHORIZATION');

  useEffect(() => {
    dispatch(resetError());
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  console.log(activeUser);

  return (
    <div data-testid='Home'>
      <AboutSection />
      <Info />
      <HelpUsSection />
      {activeUser && <Whastapp role={activeUser.role} />}
    </div>
  );
}

export default Home;
