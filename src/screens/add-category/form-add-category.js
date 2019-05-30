import React from 'react'
import { View, StyleSheet } from 'react-native'
import { object, string } from 'yup'
import { MaterialIcons } from '@expo/vector-icons'
import i18n from 'i18n-js'

import {
  ZInput,
  ZForm,
  ZValidationMessage,
  ZPicker,
} from '../../components/atomics'
import { withDb } from '../../db'
import { iconNames, palette } from '../../config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  input: {
    marginBottom: 18,
  },
})

const schema = object().shape({
  name: string().required(i18n.t('schema.category.name.errors.required')),
  iconName: string().required(
    i18n.t('schema.category.iconName.errors.required')
  ),
})

const initialValues = {
  name: '',
  iconName: iconNames[0],
}

const iconNameOptions = iconNames.map(name => ({ label: name, value: name }))

class FormAddCategory extends React.Component {
  handleSubmit = async category => {
    const { addCategory } = this.props
    await addCategory(category)
  }

  render() {
    const { formRef } = this.props

    return (
      <ZForm
        schema={schema}
        ref={formRef}
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
      >
        {({ values, handleChange, errors }) => {
          return (
            <React.Fragment>
              <View style={styles.input}>
                <ZPicker
                  label={i18n.t('schema.category.iconName.label')}
                  value={values.iconName}
                  onValueChange={handleChange('iconName')}
                  items={iconNameOptions}
                  style={styles.picker}
                  required
                  icon={
                    <MaterialIcons
                      name={values.iconName}
                      size={24}
                      color={palette.gray}
                    />
                  }
                />
                {errors.iconName && (
                  <ZValidationMessage message={errors.iconName} type="error" />
                )}
              </View>

              <View style={styles.input}>
                <ZInput
                  label={i18n.t('schema.category.name.label')}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  required
                />
                {errors.name && (
                  <ZValidationMessage message={errors.name} type="error" />
                )}
              </View>
            </React.Fragment>
          )
        }}
      </ZForm>
    )
  }
}

export default withDb(FormAddCategory)
