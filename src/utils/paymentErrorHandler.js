import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import i18n from '../i18n';

const MySwal = withReactContent(Swal);

function paymentErrorHandler(error) {
  if (error.message === 'Your card number is incomplete.') {
    return MySwal.fire({
      title: <strong>{i18n.t('donationForm.error.card')}</strong>,
      icon: 'error',
    });
  }

  if (error.message === 'Your card number is invalid.') {
    return MySwal.fire({
      title: <strong>{i18n.t('donationForm.error.card.invalid')}</strong>,
      icon: 'error',
    });
  }

  if (error.message === "Your card's security code is incomplete.") {
    return MySwal.fire({
      title: <strong>{i18n.t('donationForm.error.cvv')}</strong>,
      icon: 'error',
    });
  }

  if (error.message === "Your card's expiration date is incomplete.") {
    return MySwal.fire({
      title: <strong>{i18n.t('donationForm.error.expiration')}</strong>,
      icon: 'error',
    });
  }

  if (error.message === "Your card's expiration year is invalid.") {
    return MySwal.fire({
      title: <strong>{i18n.t('donationForm.error.expiration.invalid')}</strong>,
      icon: 'error',
    });
  }

  if (error.message === "Your card's expiration year is in the past.") {
    return MySwal.fire({
      title: <strong>{i18n.t('donationForm.error.expiration.past')}</strong>,
      icon: 'error',
    });
  }

  return MySwal.fire({
    title: <strong>{error.message}</strong>,
    icon: 'error',
  });
}

export default paymentErrorHandler;
