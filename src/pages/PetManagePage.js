import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  updateRequest,
  bulkReject,
} from '../store/toolkit/slices/generalSlice';
import { selectPet } from '../store/toolkit/slices/generalSlice';
import AdoptionRequest from '../components/AdoptionRequest';
import '../assets/styles/PetManagePage.css';

const PetManagePage = () => {
  const { id: petId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //reading info
  useEffect(() => {
    dispatch(selectPet(petId));
  }, [dispatch, petId]);

  const pet = useSelector((state) => state.general.selectedPet);
  const requests = useSelector((state) => state.general.adoptionRequests) || [];

  // Updating a state
  const handleReject = (requestId) => {
    dispatch(updateRequest({ petId, requestId, status: 'rejected' }));
  };

  const handleApprove = (requestId) => {
    dispatch(updateRequest({ petId, requestId, status: 'approved' }));
    dispatch(bulkReject({ petId, requestId }));
  };

  return (
    <div className='background-container' data-testid='petManagePage'>
      {!!pet.photoUrl ? (
        <>
          <section className='pet-info'>
            <img
              className='pet-info__image'
              src={pet.photoUrl[0]}
              alt={pet.name}
            />
            <article className='pet-info__text'>
              <h2>{pet.name}</h2>
              <p className='pet-info__text--label'>
                <span>{t('petManagePage.age')}</span> {pet.age}
              </p>
              <p className='pet-info__text--description'>{pet.description}</p>
            </article>
          </section>
          <section className='requests-list'>
            {requests.length > 0 &&
              requests.map((req) => (
                <AdoptionRequest
                  key={req._id}
                  request={req}
                  handleReject={handleReject}
                  handleApprove={handleApprove}
                />
              ))}
          </section>
        </>
      ) : (
        <h1 className='no-pets-message'>{t('petManagePage.dont.exist')}</h1>
      )}
    </div>
  );
};

export default PetManagePage;
