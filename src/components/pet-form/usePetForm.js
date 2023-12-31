import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const usePetForm = (submitForm, validateInfo) => {
  const { id: petId } = useParams();
  const { _id: userId } = useSelector((state) => state.general.user);

  const [values, setValues] = useState({
    address: '',
    phoneNumber: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      petId,
      userId,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm(values);
    }
  }, [submitForm, errors, isSubmitting, values]);

  return { handleChange, values, handleSubmit, errors };
};

export default usePetForm;
