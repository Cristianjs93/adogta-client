import i18n from '../../i18n';

export default function validateInfo(values) {
  let errors = {};

  if (!values.description.trim()) {
    errors.description = i18n.t('validateInfo.description.required');
  }

  if (!values.address) {
    errors.address = i18n.t('validateInfo.address.required');
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = i18n.t('validateInfo.phoneNumber.required');
  } else if (
    !RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).test(
      values.phoneNumber
    )
  ) {
    errors.phoneNumber = i18n.t('validateInfo.phoneNumber.invalid');
  }

  return errors;
}
