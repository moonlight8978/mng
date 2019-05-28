import React from 'react'
import { StyleSheet } from 'react-native'

import { ZBox } from '../../components/atomics'

import FormAddCategory from './form-add-category'
import { Layout } from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  input: {
    marginBottom: 18,
  },
})

class AddCategory extends React.PureComponent {
  render() {
    return (
      <Layout>
        <ZBox style={styles.container}>
          <FormAddCategory />
        </ZBox>
      </Layout>
    )
  }
}

export default AddCategory
