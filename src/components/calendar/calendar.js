import React from 'react'
import { View, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import _ from 'lodash'
import i18n from 'i18n-js'

import { ZText } from '../atomics'
import DateStruct from '../../resources/date'

import { styles, headerStyles, heatMapStyles } from './styles'
import DateList from './date-list'

const noop = () => {}

const heatMapStyle = new Map([
  [1, { point: heatMapStyles.point1, text: heatMapStyles.text1 }],
  [2, { point: heatMapStyles.point2, text: heatMapStyles.text2 }],
  [3, { point: heatMapStyles.point3, text: heatMapStyles.text3 }],
  [4, { point: heatMapStyles.point4, text: heatMapStyles.text4 }],
])

function HeaderArrow({ direction, onPress = noop }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={headerStyles.iconOuter}>
        <AntDesign name={direction} size={18} style={headerStyles.icon} />
      </View>
    </TouchableOpacity>
  )
}

class Calendar extends React.PureComponent {
  static today = DateStruct.parse(new Date())

  static defaultProps = {
    initialDate: new Date().getDate(),
    onMonthChange: noop,
    onYearChange: noop,
    onDatePress: noop,
    heatMap: {},
  }

  state = {
    month: Calendar.today.month,
    year: Calendar.today.year,
    dateList: DateList.make({
      month: Calendar.today.month,
      year: Calendar.today.year,
    }),
    date: this.props.initialDate,
  }

  handleChangeMonth = change => {
    let month = this.state.month + change
    switch (month) {
      case 13:
        month = 1
        break
      case 0:
        month = 12
        break
      default:
        break
    }
    const dateList = DateList.make({
      month,
      year: this.state.year,
    })
    const numberOfDates = DateList.getNumberOfDates({
      month,
      year: this.state.year,
    })
    this.setState(
      state => ({
        month,
        dateList,
        date: state.date > numberOfDates ? numberOfDates : state.date,
      }),
      () => this.props.onMonthChange(this.onChangeProps())
    )
  }

  handleChangeYear = change => {
    const year = this.state.year + change
    const dateList = DateList.make({
      month: this.state.month,
      year,
    })
    const numberOfDates = DateList.getNumberOfDates({
      month: this.state.month,
      year,
    })
    this.setState(
      state => ({
        year,
        dateList,
        date: state.date > numberOfDates ? numberOfDates : state.date,
      }),
      () => this.props.onYearChange(this.onChangeProps())
    )
  }

  handleDatePress = date => {
    this.setState({ date }, () => this.props.onDatePress(this.onChangeProps()))
  }

  onChangeProps = () => _.pick(this.state, 'month', 'year', 'date')

  getHeatMapPointLevel = date => {
    const { heatMap } = this.props
    const value = heatMap[date]
    if (!value || value <= 25) {
      return 1
    }
    if (value <= 50) {
      return 2
    }
    if (value <= 75) {
      return 3
    }
    return 4
  }

  render() {
    const { dateList, month, year, date: selectedDate } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.calendarHeader}>
          <HeaderArrow
            direction="left"
            onPress={() => this.handleChangeYear(-1)}
          />
          <ZText size="xxlarge">{year}</ZText>
          <HeaderArrow
            direction="right"
            onPress={() => this.handleChangeYear(1)}
          />
        </View>

        <View style={styles.calendarHeader}>
          <HeaderArrow
            direction="left"
            onPress={() => this.handleChangeMonth(-1)}
          />
          <ZText size="large">{i18n.t(`calendar.months.long.${month}`)}</ZText>
          <HeaderArrow
            direction="right"
            onPress={() => this.handleChangeMonth(1)}
          />
        </View>

        <View>
          <View style={styles.calendarRow}>
            {new Array(7).fill(0).map((_value, index) => (
              <ZText
                style={[styles.calendarCol, styles.colText, styles.dayOfWeek]}
                size="small"
                key={index.toString()}
              >
                {i18n.t(`calendar.dayOfWeeks.${index + 1}`)}
              </ZText>
            ))}
          </View>

          <View style={styles.calendarRow}>
            {dateList.map(date => {
              const level = this.getHeatMapPointLevel(date)
              const style = heatMapStyle.get(level)

              return date >= 1 && date <= 31 ? (
                <TouchableNativeFeedback
                  key={date}
                  onPress={() => this.handleDatePress(date)}
                >
                  <View
                    style={[
                      styles.calendarCol,
                      date === selectedDate ? styles.selectedDate : null,
                    ]}
                  >
                    <View style={[styles.heatPoint, style.point]}>
                      <ZText style={[styles.colText, style.text]}>{date}</ZText>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              ) : (
                <View style={styles.calendarCol} key={date} />
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default Calendar
