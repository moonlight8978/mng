import React from 'react'
import { StyleSheet } from 'react-native'

import { Layout } from '../../components'
import { ZBox } from '../../components/atomics'

import FormAddPayment from './form-add-payment'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    padding: 12,
  },
  input: {
    marginBottom: 12,
  },
})

class AddPayment extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      submitForm: () => this.formRef.current.handleSubmit(),
    })
  }

  formRef = React.createRef()

  render() {
    const targetDate = this.props.navigation.getParam('targetDate')

    return (
      <Layout>
        <ZBox style={styles.container}>
          <FormAddPayment targetDate={targetDate} formRef={this.formRef} />
        </ZBox>
      </Layout>
    )
  }
}

export default AddPayment
