import i18n from 'i18n-js'

class ValidationError extends Error {
  constructor(values) {
    super(i18n.t('schema.common.errors.validationFailed'))
    this.values = values
  }
}

export default ValidationError
