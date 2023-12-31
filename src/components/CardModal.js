import { useTranslation } from 'react-i18next';
import '../assets/styles/CardModal.css';

const CardModal = ({
  id,
  onRequestResponse,
  requestResponse,
  handleApprove,
  handleReject,
  handleDeletePet,
  children,
}) => {
  const { t } = useTranslation();

  const handleConfirm = (e) => {
    if (requestResponse === 'approve') {
      handleApprove(id);
    }
    if (requestResponse === 'reject') {
      handleReject(id);
    }
    if (!requestResponse) {
      handleDeletePet(id);
    }
    onRequestResponse(e);
  };

  return (
    <div className='card-modal' data-testid='deletePetModal'>
      <div className='class-modal__container'>
        <p>{children}</p>
        <div className='class-modal__buttons'>
          <button name='pending' onClick={handleConfirm}>
            {t('cardModal.confirm')}
          </button>
          <button name='pending' onClick={onRequestResponse}>
            {t('cardModal.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
