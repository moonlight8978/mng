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
  componentDidMount() {
    this.props.navigation.setParams({
      submitForm: () => this.formRef.current.handleSubmit(),
    })
  }

  formRef = React.createRef()

  render() {
    return (
      <Layout>
        <ZBox style={styles.container}>
          <FormAddCategory formRef={this.formRef} />
        </ZBox>
      </Layout>
    )
  }
}

export default AddCategory
