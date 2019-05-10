import React from 'react'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Layout } from '../../components'
import { DateStruct } from '../../resources'
import { ZBox } from '../../components/atomics'
import { HeaderRightIcon } from '../../components/navigation'
import { palette } from '../../config'

import FormAddPayment from './form-add-payment'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    padding: 12,
  },
  keyboardView: {
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
  inputsGroup: {},
})

class AddPayment extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: DateStruct.toString(navigation.getParam('targetDate')),
    headerRight: (
      <HeaderRightIcon
        icon={
          <MaterialCommunityIcons
            name="check"
            size={28}
            color={palette.white}
          />
        }
        onPress={async () => {
          await navigation.getParam('submitForm')()
          navigation.goBack()
        }}
      />
    ),
  })

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
