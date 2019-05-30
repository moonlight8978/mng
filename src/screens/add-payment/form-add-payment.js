import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { object, string } from 'yup'
import i18n from 'i18n-js'

import {
  ZInput,
  ZForm,
  ZValidationMessage,
  ZPicker,
} from '../../components/atomics'
import { withDb } from '../../db'
import { palette } from '../../config'

const styles = StyleSheet.create({
  input: {
    marginBottom: 18,
  },
})

const schema = object().shape({
  purpose: string().required(i18n.t('schema.payment.purpose.errors.required')),
  price: string()
    .required(i18n.t('schema.payment.price.errors.required'))
    .matches(/\d+/, {
      message: i18n.t('schema.payment.price.errors.notNumber'),
    })
    .test(
      'is greater than 0',
      i18n.t('schema.payment.price.errors.greaterThanZero'),
      value => {
        if (!value || !value.match(/\d+/)) {
          return true
        }

        return parseInt(value, 10) > 0
      }
    ),
  category: string().required(
    i18n.t('schema.payment.category.errors.required')
  ),
})

const initialValues = categories => ({
  category: categories[0] && categories[0].id,
  purpose: '',
  price: '0',
})

class FormAddPayment extends React.Component {
  handleSubmit = async payment => {
    const { targetDate, addPayment } = this.props
    await addPayment(targetDate, {
      ...payment,
      price: parseInt(payment.price, 10),
    })
  }

  render() {
    const { formRef, db, dbSelectors } = this.props
    const categories = dbSelectors.findCategories(db)
    const categoryOptions = categories.map(category => ({
      value: category.id,
      label: category.name,
    }))

    return (
      <View>
        <ZForm
          schema={schema}
          ref={formRef}
          onSubmit={this.handleSubmit}
          initialValues={initialValues(categories)}
        >
          {({ values, handleChange, errors }) => {
            const selectedCategory = dbSelectors.findCategory(values.category)(
              db
            )

            return (
              <React.Fragment>
                <View style={styles.input}>
                  <ZPicker
                    label={i18n.t('schema.payment.category.label')}
                    value={values.category}
                    onValueChange={handleChange('category')}
                    items={categoryOptions}
                    required
                    icon={
                      <MaterialIcons
                        name={selectedCategory.iconName}
                        size={24}
                        color={palette.gray}
                      />
                    }
                  />
                </View>

                <View style={styles.input}>
                  <ZInput
                    label={i18n.t('schema.payment.purpose.label')}
                    value={values.purpose}
                    onChangeText={handleChange('purpose')}
                    required
                  />
                  {errors.purpose && (
                    <ZValidationMessage message={errors.purpose} type="error" />
                  )}
                </View>

                <View>
                  <ZInput
                    label={i18n.t('schema.payment.price.label')}
                    value={values.price}
                    onChangeText={handleChange('price')}
                    required
                  />
                  {errors.price && (
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
