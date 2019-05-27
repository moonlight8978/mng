import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Layout } from '../../components'
import { DateStruct } from '../../resources'
import { HeaderRightIcon } from '../../components/navigation'
import { palette } from '../../config'
import { DbConsumer } from '../../db'

import TotalSpent from './total-spent'
import Payment from './payment'
import { styles } from './date-payments.styles'

class DatePayments extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: DateStruct.toString(navigation.getParam('targetDate')),
    headerRight: (
      <HeaderRightIcon
        icon={<MaterialIcons name="add" size={28} color={palette.white} />}
        onPress={() =>
          navigation.navigate('AddPayment', {
            targetDate: navigation.getParam('targetDate') || {
              date: 10,
              month: 5,
              year: 2019,
            },
          })
        }
      />
    ),
  })

  render() {
    const { navigation } = this.props
    const targetDate = navigation.getParam('targetDate')

    return (
      <Layout>
        <DbConsumer>
          {({ db, dbSelectors }) => {
            const datePayments = dbSelectors.findDate(targetDate)(db)
            const { payments, total } = datePayments

            return (
              <>
                <TotalSpent total={total} />

                <View style={styles.paymentList}>
                  {payments.map((payment, index) => (
                    <Payment key={payment.id} payment={payment} />
                  ))}
                </View>
              </>
            )
          }}
        </DbConsumer>
      </Layout>
    )
  }
}

export default DatePayments
