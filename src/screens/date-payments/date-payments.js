import React from 'react'
import { View } from 'react-native'

import { Layout } from '../../components'
import { DbConsumer } from '../../db'

import TotalSpent from './total-spent'
import Payment from './payment'
import { styles } from './date-payments.styles'

class DatePayments extends React.PureComponent {
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
