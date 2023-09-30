import { useState } from 'react';

import CardModal from './CardModal';

import '../assets/styles/AdoptionRequest.css';

const AdoptionRequest = ({ request, handleReject, handleApprove }) => {
  let classStatus = '';
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestResponse, setRequestResponse] = useState('pending');

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
            <span className={classStatus}>{request.responseStatus}</span>
          </p>
          {handleApprove && (
            <div className='request-container__buttons'>
              <button
                name='approve'
                className='button-accept'
                onClick={handleRequestResponse}>
                Approve
              </button>
              <button
                name='reject'
                className='button-reject'
                onClick={handleRequestResponse}>
                Reject
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
          Are you sure you want to {requestResponse} this request? This action
          can't be undone
        </CardModal>
      )}
    </>
  );
};

export default AdoptionRequest;
