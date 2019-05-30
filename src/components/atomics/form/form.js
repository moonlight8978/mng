import React from 'react'
import _ from 'lodash'
import i18n from 'i18n-js'

import { yupToFormErrors, validateYupSchema } from './formik'

class Form extends React.PureComponent {
  state = {
    errors: {},
    values: this.props.initialValues || {},
    touched: {},
    isSubmitting: false,
  }

  handleSubmit = async () => {
    await this.runValidations()
    if (_.isEmpty(this.state.errors)) {
      this.setState({ isSubmitting: true })
      await this.props.onSubmit(this.state.values)
      this.setState({ isSubmitting: false })
    } else {
      throw new Error(i18n.t('schema.common.errors.validationFailed'))
    }
  }

  handleChange = name => value => {
    this.setState(
      state => ({
        values: { ...state.values, [name]: value },
        touched: { ...state.touched, [name]: true },
      }),
      this.runValidations
    )
  }

  runValidations = async () => {
    const { schema } = this.props
    let errors = {}
    try {
      await validateYupSchema(this.state.values, schema)
    } catch (error) {
      errors = yupToFormErrors(error)
    } finally {
      if (!_.isEqual(errors, this.state.errors)) {
        this.setState({ errors })
      }
    }
  }

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
    })
  }
}

export default Form
