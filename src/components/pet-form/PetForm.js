import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdoption } from '../../store/toolkit/slices/generalSlice';
import PetFormSignUp from './PetFormSignUp';
import PetFormSuccess from './PetFormSuccess';
import PetFormRepeat from './PetFormRepeatjs';
import Slider2 from '../slider2/Slider2';
import Spinner from '../../components/Spinner';
import '../../assets/styles/PetForm.css';

const PetForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { error } = useSelector((state) => state.general);
  const { errStatus } = useSelector((state) => state.general);

  const [err, setError] = useState(error);

  const dispatch = useDispatch();

  function submitForm(values) {
    try {
      dispatch(createAdoption(values));

      setIsSubmitted(true);

      if (error) {
        throw new Error(error);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    setError(error);
  }, [error]);

  function renderSubmitted() {
    if (errStatus === 'INITIALIZED') {
      return <Spinner />;
    }
    return (
      <>
        {err.length && errStatus === 'FINISHED' ? (
          <PetFormRepeat />
        ) : (
          !err.length && <PetFormSuccess />
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={
          isSubmitted ? 'petFormContainer' : 'petFormContainer petFormGrid'
        }>
        {!isSubmitted ? (
          <>
            <div className='petFormContainer__content--left'>
              <Slider2 />
            </div>
            <PetFormSignUp submitForm={submitForm} />
          </>
        ) : (
          renderSubmitted()
        )}
      </div>
    </>
  );
};

export default PetForm;
