import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  listPets,
  listFoundationRequests,
} from '../store/toolkit/slices/generalSlice';
import { IconContext } from 'react-icons';
import CardList from '../components/CardList';
import PetCard from '../components/PetCard';
import PaginationButtons from '../components/PaginationButtons';
import history from '../history';
import { FaPlusCircle } from 'react-icons/fa';
import '../assets/styles/PetListPage.css';

const PetListPage = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { id: foundationId } = useParams();

  const [petsChanges, setPetsChanges] = useState(true);

  const { pets, petListInfo } = useSelector((state) => state.general);
  const { user } = useSelector((state) => state.general);

  const { t } = useTranslation();

  let redirectUrl = '';
  const loading = petListInfo.page ? false : true;
  const initPage = search.slice(search.indexOf('=') + 1) || 1;

  //initial loading for pets and requests
  useEffect(() => {
    dispatch(listPets({ initPage, foundationId }));
    dispatch(listFoundationRequests(foundationId));
  }, [foundationId, dispatch, initPage, petsChanges]);

  //checking the role and the id to show or hide some buttons and select som redirects
  const isFoundation = user.role === 'foundation' && user._id === foundationId;

  isFoundation ? (redirectUrl = '/manage') : (redirectUrl = '/request');

  //List buttons
  let nextButton = false;
  let previousButton = false;

  petListInfo.page === 1 ? (previousButton = true) : (previousButton = false);
  petListInfo.page === Math.ceil(petListInfo.count / 10)
    ? (nextButton = true)
    : (nextButton = false);

  const handleNextPage = () => {
    dispatch(listPets({ initPage: petListInfo.page + 1, foundationId }));
    history.push({
      pathname: `/foundations/${foundationId}/pets`,
      search: `?page=${petListInfo.page + 1}`,
    });
  };

  const handlePreviousPage = () => {
    dispatch(listPets({ initPage: petListInfo.page - 1, foundationId }));
    history.push({
      pathname: `/foundations/${foundationId}/pets`,
      search: `?page=${petListInfo.page - 1}`,
    });
  };

  const handlePetsChange = () => {
    setPetsChanges(!petsChanges);
  };

  return (
    <div className='background-container'>
      {!loading && (
        <>
          <CardList title={t('petListPage.looking.friend')}>
            {pets.length > 0 ? (
              pets.map((item) => (
                <PetCard
                  key={item._id}
                  {...item}
                  redirectUrl={redirectUrl}
                  isFoundation={isFoundation}
                  onPetsChange={handlePetsChange}
                />
              ))
            ) : isFoundation ? (
              <h1 className='no-pets-message' data-testid='noPetsFoundation'>
                {t('petListPage.no.pets.foundations')}
              </h1>
            ) : (
              <h1 className='no-pets-message' data-testid='noPetsUser'>
                {t('petListPage.no.pets.user')}
              </h1>
            )}
          </CardList>
        </>
      )}
      {petListInfo.count > 10 && (
        <PaginationButtons
          previousButton={previousButton}
          nextButton={nextButton}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      )}
      {isFoundation ? (
        <IconContext.Provider
          value={{
            color: 'var(--blue-pigment)',
            className: 'add-pets-container__icon',
          }}>
          <Link to={`/foundations/${foundationId}/add-pet`}>
            <div className='add-pets-container' data-testid='addPetButton'>
              {' '}
              <FaPlusCircle />
            </div>
          </Link>
        </IconContext.Provider>
      ) : (
        <Link
          to={`/foundations/${foundationId}/donate`}
          className='add-pets-container donate-button'>
          {t('petListPage.donate')}
        </Link>
      )}
    </div>
  );
};

export default PetListPage;
