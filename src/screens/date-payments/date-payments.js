import React from 'react'
import { StyleSheet } from 'react-native'
import i18n from 'i18n-js'

import { Layout, List } from '../../components'
import { DbConsumer } from '../../db'

import TotalSpent from './total-spent'
import Payment from './payment'
import { ZBox } from '../../components/atomics'

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
})

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

                <ZBox fluid>
                  <List
                    data={payments}
                    renderItem={({ item }) => <Payment payment={item} />}
                    emptyText={i18n.t('category.list.empty')}
                    style={styles.list}
                  />
                </ZBox>
              </>
            )
          }}
        </DbConsumer>
      </Layout>
    )
  }
}

export default DatePayments
