import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addPets, resetError } from '../store/toolkit/slices/generalSlice';
import { PrimaryButton } from '../components/PrimaryButton';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { FaCloudUploadAlt } from 'react-icons/fa';
import '../assets/styles/AddPet.css';

function AddPet() {
  const { id: foundationId } = useParams();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.general.error);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const [pet, setPet] = useState({
    petName: '',
    petAge: '',
    petDescription: '',
    photoUrl: [],
    foundationId: foundationId,
    error: {
      petName: false,
      petAge: false,
      petDescription: false,
    },
  });

  const [counter, setCounter] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);

  const fileInput = useRef(null);

  const MySwal = withReactContent(Swal);

  const handleOndragOver = (event) => {
    event.preventDefault();
  };

  const handleOndrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      const fileArray = Array.from(event.dataTransfer.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(event.dataTransfer.files).map((file) =>
        URL.revokeObjectURL(file)
      );
    }

    let imageFile = event.dataTransfer.files;
    setPet((prevState) => ({
      ...prevState,
      photoUrl: [...prevState.photoUrl, ...imageFile],
    }));
    setCounter(counter + imageFile.length);
  };

  const handleInputChange = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
    }

    let imageFile = event.target.files;
    setPet((prevState) => ({
      ...prevState,
      photoUrl: [...prevState.photoUrl, ...imageFile],
    }));
    setCounter(counter + event.target.files.length);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    fileInput.current.click();
  };

  const submit = (event) => {
    event.preventDefault();

    if (!pet.petName || !pet.petAge || !pet.petDescription) {
      return MySwal.fire({
        title: <strong>{t('addPet.error.field')}</strong>,
        icon: 'error',
      });
    }

    if (!pet.photoUrl.length) {
      return MySwal.fire({
        title: <strong>{t('addPet.error.image')}</strong>,
        icon: 'error',
      });
    }

    dispatch(addPets(pet));

    setPet({
      petName: '',
      petAge: '',
      petDescription: '',
      photoUrl: [],
      foundationId: foundationId,
      error: {
        petName: false,
        petAge: false,
        petDescription: false,
      },
    });

    setSelectedImages([]);

    setCounter(0);

    MySwal.fire({
      title: <strong>{t('addPet.success')}</strong>,
      icon: 'success',
    });
  };

  const validator = (event) => {
    const validate = /^\s*$/.test(event.target.value);
    setPet((prevState) => ({
      ...prevState,
      error: { ...prevState.error, [event.target.name]: validate },
    }));
  };

  const InputChange = (event) => {
    setPet({ ...pet, [event.target.name]: event.target.value });
  };

  return (
    <section className='registerPets'>
      <div className='registerPets__container'>
        <h2 className='registerPets__container--title'>{t('addPet.title')}</h2>
        <form onSubmit={submit} data-testid='form'>
          <div
            className='container__dropzone'
            onDragOver={handleOndragOver}
            onDrop={handleOndrop}
            onClick={handleClick}
            multiple>
            <p className='container__dropzone--text'>
              {t('addPet.image.select')}
            </p>
            <i className='container__dropzone--uploadIcon'>
              <FaCloudUploadAlt />
            </i>
          </div>
          <div className='container__dropzone--inputs'>
            <h3 className='container__dropzone--counter'>
              {t('addPet.Images.uploaded')}
              {counter}
            </h3>
            <input
              type='file'
              ref={fileInput}
              accept='image/*'
              name='file'
              multiple
              hidden
              className='container__dropzone--input'
              onChange={handleInputChange}
            />
            {pet.error.petName && (
              <span className='container__dropzone--inputsErrors'>
                {t('addPet.error.name')}
              </span>
            )}
            <input
              type='text'
              name='petName'
              id='name'
              placeholder={t('addPet.name.placeholder')}
              value={pet.petName}
              data-testid='name'
              onChange={InputChange}
              onBlur={validator}
              className='container__dropzone--input'
            />
            {pet.error.petAge && (
              <span className='container__dropzone--inputsErrors'>
                {t('addPet.error.age')}
              </span>
            )}
            <input
              type='number'
              name='petAge'
              id='age'
              min='0'
              placeholder={t('addPet.age.placeholder')}
              value={pet.petAge}
              data-testid='age'
              onChange={InputChange}
              onBlur={validator}
              className='container__dropzone--input'
            />
            {pet.error.petDescription && (
              <span className='container__dropzone--inputsErrors'>
                {t('addPet.error.description')}
              </span>
            )}
            <textarea
              rows='7'
              name='petDescription'
              id='description'
              placeholder={t('addPet.description.placeholder')}
              value={pet.petDescription}
              data-testid='description'
              onChange={InputChange}
              onBlur={validator}
              className='container__dropzone--textArea'
            />
            {!!error && (
              <span className='container__dropzone--inputsErrors'>{error}</span>
            )}
            <div className='addButton'>
              <PrimaryButton
                children={t('addPet.button')}
                color={'primaryButton addPets'}
              />
            </div>
          </div>
        </form>
        {selectedImages.map((photo) => {
          return (
            <img
              className='registerPets__container--photos'
              src={photo}
              key={photo}
              alt=''
            />
          );
        })}
      </div>
    </section>
  );
}

export default AddPet;
