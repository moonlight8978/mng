import React from 'react'
import { View, StyleSheet } from 'react-native'
import { object, string } from 'yup'
import { MaterialIcons } from '@expo/vector-icons'

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
  name: string().required('Category name is required'),
  iconName: string().required('Icon is required'),
})

const initialValues = {
  name: '',
  iconName: iconNames[0],
}

const iconNameOptions = iconNames.map(name => ({ label: name, value: name }))

class FormAddCategory extends React.Component {
  handleSubmit = async values => {
    const { addCategory } = this.props
    await addCategory(values)
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
        {({ values, handleChange, errors, touched }) => {
          return (
            <React.Fragment>
              <View style={styles.input}>
                <ZPicker
                  label="Icon"
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
              </View>

              <View style={styles.input}>
                <ZInput
                  label="Category name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  required
                />
                {touched.name && errors.name && (
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
