import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardModal from './CardModal';
import '../assets/styles/AdoptionRequest.css';

const AdoptionRequest = ({ request, handleReject, handleApprove }) => {
  let classStatus = '';
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestResponse, setRequestResponse] = useState('pending');
  const { t } = useTranslation();

  const handleRequestResponse = (e) => {
    const { name } = e.target;
    setRequestResponse(name);
    setModalIsOpen(!modalIsOpen);
  };

  request.responseStatus === 'approved' && (classStatus = 'status-green');

  request.responseStatus === 'rejected' && (classStatus = 'status-red');

  return (
    <>
      <div className='request-container' data-testid='requestCard'>
        {!!request.userId.name ? (
          <h2 className='request-container__name'>{request.userId.name}</h2>
        ) : (
          <h2 className='request-container__name'>{request.petId.name}</h2>
        )}
        <div className='request-container__text'>{request.description}</div>
        <div className='request-container__lower-text'>
          <p>
            STATUS:{' '}
            <span className={classStatus}>
              {request.responseStatus === 'pending'
                ? t('adoptionRequest.status.pending')
                : request.responseStatus === 'approved'
                ? t('adoptionRequest.status.approved')
                : t('adoptionRequest.status.rejected')}
            </span>
          </p>
          {handleApprove && (
            <div className='request-container__buttons'>
              <button
                name='approve'
                className='button-accept'
                onClick={handleRequestResponse}>
                {t('adoptionRequest.approve')}
              </button>
              <button
                name='reject'
                className='button-reject'
                onClick={handleRequestResponse}>
                {t('adoptionRequest.reject')}
              </button>
            </div>
          )}
        </div>
      </div>
      {modalIsOpen && (
        <CardModal
          id={request._id}
          onRequestResponse={handleRequestResponse}
          requestResponse={requestResponse}
          handleApprove={handleApprove}
          handleReject={handleReject}>
          {t('adoptionRequest.sure', {
            requestResponse:
              requestResponse === 'approve'
                ? t('adoptionRequest.requestResponse.approve')
                : t('adoptionRequest.requestResponse.reject'),
          })}
        </CardModal>
      )}
    </>
  );
};

export default AdoptionRequest;
