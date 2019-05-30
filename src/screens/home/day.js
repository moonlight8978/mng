import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import i18n from 'i18n-js'

import { ZText } from '../../components/atomics'

import { styles } from './day.styles'
import { withDb } from '../../db'
import { DateList } from '../../components/calendar'
import { currency } from '../../config'

class Day extends React.PureComponent {
  goToDetailScreen = () => {
    const { navigation, targetDate } = this.props
    navigation.navigate('DatePayments', { targetDate })
  }

  render() {
    const { targetDate, dbSelectors, db } = this.props
    const dateDb = dbSelectors.findDate(targetDate)(db)
    const totalSpentInMonth = dbSelectors.calculateMonthTotal(targetDate)(db)
    const numberOfDates = DateList.getNumberOfDates(targetDate)
    const average = Math.round(totalSpentInMonth / numberOfDates)
    const change = Math.abs(totalSpentInMonth - average)
    const changeSign = totalSpentInMonth <= average ? '+' : '-'
    const changePercentage =
      average && Math.round(totalSpentInMonth / average) * 100
    const datePercentage =
      totalSpentInMonth && Math.round((dateDb.total * 100) / totalSpentInMonth)

    return (
      <View>
        <View style={styles.titleRow}>
          <ZText style={styles.title} size="xxlarge">
            {`${targetDate.year}-${targetDate.month}-${targetDate.date}`}
          </ZText>

          <TouchableOpacity onPress={this.goToDetailScreen}>
            <ZText>{i18n.t('home.toDetail')}</ZText>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <ZText style={styles.label}>{i18n.t('home.dateSpentLabel')}</ZText>
          <View style={styles.value}>
            <ZText style={styles.valueText}>{dateDb.total}</ZText>
            <ZText style={styles.valueText}>{currency.short}</ZText>
            <ZText style={styles.valueText}>{`(${datePercentage}%)`}</ZText>
          </View>
        </View>

        <View style={styles.row}>
          <ZText style={styles.label}>{i18n.t('home.monthSpentLabel')}</ZText>
          <View style={styles.value}>
            <ZText style={styles.valueText}>{totalSpentInMonth}</ZText>
            <ZText style={styles.valueText}>{currency.short}</ZText>
          </View>
        </View>

        <View style={styles.row}>
          <ZText style={styles.label}>
            {i18n.t('home.averageInMonthLabel')}
          </ZText>
          <View style={styles.value}>
            <ZText style={styles.valueText}>{average}</ZText>
            <ZText style={styles.valueText}>{currency.short}</ZText>
          </View>
        </View>

        <View style={styles.row}>
          <ZText style={styles.label}>{i18n.t('home.compareToAverage')}</ZText>
          <View style={styles.value}>
            <ZText style={[styles.change, styles.valueText]}>
              {changeSign}
            </ZText>
            <ZText style={[styles.change, styles.valueText]}>{change}</ZText>
            <ZText style={[styles.change, styles.valueText]}>
              {currency.short}
            </ZText>
            <ZText style={[styles.change, styles.valueText]}>
              {`(${changePercentage}%)`}
            </ZText>
          </View>
        </View>
      </View>
    )
  }
}

export default withNavigation(withDb(Day))
