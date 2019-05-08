import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { ZText } from '../../components/atomics'

import { styles } from './day.styles'
import { withDb } from '../../db'
import { DateList } from '../../components/calendar'

class Day extends React.PureComponent {
  render() {
    const { date, db, dbSelectors } = this.props
    const monthDb = dbSelectors.findMonth(date)(db)
    const dateDb = dbSelectors.findDate(date.date)(monthDb)
    const totalSpentInMonth = dbSelectors.calculateMonthTotal(date)(db)
    const numberOfDates = DateList.getNumberOfDates(date)
    const average = Math.round(totalSpentInMonth / numberOfDates)
    const change = Math.abs(totalSpentInMonth - average)
    const changeSign = totalSpentInMonth <= average ? '+' : '-'
    const changePercentage =
      average && Math.round(totalSpentInMonth / average) * 100
    const datePercentage =
      totalSpentInMonth && Math.round(dateDb.total / totalSpentInMonth) * 100

    return (
      <View>
        <View style={styles.titleRow}>
          <ZText style={styles.title} size="xxlarge">
            {`${date.year}-${date.month}-${date.date}`}
          </ZText>

          <TouchableOpacity onPress={() => {}}>
            <ZText>Show more</ZText>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <ZText style={styles.label}>This day</ZText>
          <View style={styles.value}>
            <ZText style={styles.valueText}>{dateDb.total}</ZText>
            <ZText style={styles.valueText}>VND</ZText>
            <ZText style={styles.valueText}>{`(${datePercentage}%)`}</ZText>
          </View>
        </View>

        <View style={styles.row}>
          <ZText style={styles.label}>This month</ZText>
          <View style={styles.value}>
            <ZText style={styles.valueText}>{totalSpentInMonth}</ZText>
            <ZText style={styles.valueText}>VND</ZText>
          </View>
        </View>

        <View style={styles.row}>
          <ZText style={styles.label}>Average</ZText>
          <View style={styles.value}>
            <ZText style={styles.valueText}>{average}</ZText>
            <ZText style={styles.valueText}>VND</ZText>
          </View>
        </View>

        <View style={styles.row}>
          <ZText style={styles.label}>Change</ZText>
          <View style={styles.value}>
            <ZText style={[styles.change, styles.valueText]}>
              {changeSign}
            </ZText>
            <ZText style={[styles.change, styles.valueText]}>{change}</ZText>
            <ZText style={[styles.change, styles.valueText]}>VND</ZText>
            <ZText style={[styles.change, styles.valueText]}>
              {`(${changePercentage}%)`}
            </ZText>
          </View>
        </View>
      </View>
    )
  }
}

export default withDb(Day)
