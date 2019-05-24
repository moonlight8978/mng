import React from 'react'
import { View, StyleSheet } from 'react-native'
import { object, string } from 'yup'

import {
  ZInput,
  ZForm,
  ZValidationMessage,
  ZPicker,
} from '../../components/atomics'
import { withDb } from '../../db'

const styles = StyleSheet.create({
  input: {
    marginBottom: 18,
  },
})

const schema = object().shape({
  purpose: string().required('purpose is required'),
  price: string()
    .required('price is required')
    .matches(/\d+/, { message: 'price is not invalid' }),
  category: string().required('category is required'),
})

class FormAddPayment extends React.Component {
  handleSubmit = async values => {
    const { targetDate, addPayment } = this.props
    await addPayment(targetDate, values)
  }

  render() {
    const { formRef } = this.props

    return (
      <View>
        <ZForm schema={schema} ref={formRef} onSubmit={this.handleSubmit}>
          {({ values, handleChange, errors, touched }) => {
            return (
              <React.Fragment>
                <View style={styles.input}>
                  <ZPicker
                    label="Category"
                    value={values.category}
                    onValueChange={handleChange('category')}
                    items={[
                      { label: 'Shopping', value: 'shopping' },
                      { label: 'Game', value: 'game' },
                    ]}
                    required
                  />
                </View>

                <View style={styles.input}>
                  <ZInput
                    label="Purpose"
                    value={values.purpose}
                    onChangeText={handleChange('purpose')}
                    required
                  />
                  {touched.purpose && errors.purpose && (
                    <ZValidationMessage message={errors.purpose} type="error" />
                  )}
                </View>

                <View>
                  <ZInput
                    label="Price"
                    value={values.price}
                    onChangeText={handleChange('price')}
                    required
                  />
                  {touched.price && errors.price && (
                    <ZValidationMessage message={errors.price} type="error" />
                  )}
                </View>
              </React.Fragment>
            )
          }}
        </ZForm>
      </View>
    )
  }
}

export default withDb(FormAddPayment)
