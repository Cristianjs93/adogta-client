import { useTranslation } from 'react-i18next';
import '../assets/styles/PaginationButtons.css';

const PaginationButtons = ({
  previousButton,
  nextButton,
  handleNextPage,
  handlePreviousPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className='list-buttons'>
      <button disabled={previousButton} onClick={handlePreviousPage}>
        {t('paginationButtons.prev')}
      </button>
      <button disabled={nextButton} onClick={handleNextPage}>
        {t('paginationButtons.next')}
      </button>
    </div>
  );
};

export default PaginationButtons;
