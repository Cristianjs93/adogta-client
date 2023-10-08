import i18n from '../i18n';
export default function validateInfo(values) {
  let errors = {};

  if (!values.idNumber?.trim()) {
    errors.idNumber = i18n.t('validateDonation.identification');
  }

  if (!values.cardNumber) {
    errors.cardNumber = i18n.t('validateDonation.cardNumber');
  }

  if (!values.expMonth || !values.expYear) {
    errors.expDate = i18n.t('validateDonation.expirationDate');
  }

  if (!values.cvc) {
    errors.cvc = i18n.t('validateDonation.cvcCode');
  }

  if (!values.amount) {
    errors.amount = i18n.t('validateDonation.amount');
  }

  if (!values.dues) {
    errors.dues = i18n.t('validateDonation.dues');
  } else if (values.dues > 12 || values.dues < 1) {
    errors.dues = i18n.t('validateDonation.invalid.dues');
  }
  return errors;
}
