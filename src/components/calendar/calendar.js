import React from 'react'
import { View, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { ZText } from '../atomics'

import { styles, dayStyles, headerStyles } from './styles'

const noop = () => {}

function HeaderArrow({ direction, onPress = noop }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={headerStyles.iconOuter}>
        <AntDesign name={direction} size={18} style={headerStyles.icon} />
      </View>
    </TouchableOpacity>
  )
}

function Calendar() {
  const calendar = new Array(30).fill(0).map((_value, index) => index + 1)

  return (
    <View>
      <View style={styles.calendarHeader}>
        <HeaderArrow direction="left" onPress={() => console.log('abc')} />
        <ZText size="xxlarge">2019</ZText>
        <HeaderArrow direction="right" />
      </View>

      <View style={styles.calendarHeader}>
        <HeaderArrow direction="left" />
        <ZText size="large">May</ZText>
        <HeaderArrow direction="right" />
      </View>

      <View>
        <View style={styles.calendarRow}>
          <ZText
            style={[styles.calendarCol, styles.colText, styles.dayOfWeek]}
            size="small"
          >
            Mon
          </ZText>
          <ZText
            style={[styles.calendarCol, styles.colText, styles.dayOfWeek]}
            size="small"
          >
            Tue
          </ZText>
          <ZText
            style={[styles.calendarCol, styles.colText, styles.dayOfWeek]}
            size="small"
          >
            Wed
          </ZText>
          <ZText
            style={[styles.calendarCol, styles.colText, styles.dayOfWeek]}
            size="small"
          >
            Thu
          </ZText>
          <ZText
            style={[styles.calendarCol, styles.colText, styles.dayOfWeek]}
            size="small"
          >
            Fri
          </ZText>
          <ZText
            style={[styles.calendarCol, styles.colText, styles.dayOfWeek]}
            size="small"
          >
            Sat
          </ZText>
          <ZText
            style={[styles.calendarCol, styles.colText, styles.dayOfWeek]}
            size="small"
          >
            Sun
          </ZText>
        </View>

        <View style={styles.calendarRow}>
          {calendar.map(date => (
            <TouchableNativeFeedback
              key={date}
              onPress={() => console.log('hello')}
            >
              <View style={styles.calendarCol}>
                <View style={styles.heatPoint}>
                  <ZText style={[styles.colText, styles.dayOfMonth]}>
                    {date}
                  </ZText>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      </View>

      <View>
        <View style={dayStyles.titleRow}>
          <ZText style={dayStyles.title} size="xxlarge">
            May 19th, 2019
          </ZText>

          <TouchableOpacity onPress={noop}>
            <ZText>Show more</ZText>
          </TouchableOpacity>
        </View>

        <View style={dayStyles.row}>
          <ZText style={dayStyles.label}>This day</ZText>
          <View style={dayStyles.value}>
            <ZText style={dayStyles.valueText}>50.000.000</ZText>
            <ZText style={dayStyles.valueText}>VND</ZText>
            <ZText style={dayStyles.valueText}>(50%)</ZText>
          </View>
        </View>

        <View style={dayStyles.row}>
          <ZText style={dayStyles.label}>This month</ZText>
          <View style={dayStyles.value}>
            <ZText style={dayStyles.valueText}>100.000.000</ZText>
            <ZText style={dayStyles.valueText}>VND</ZText>
          </View>
        </View>

        <View style={dayStyles.row}>
          <ZText style={dayStyles.label}>Average</ZText>
          <View style={dayStyles.value}>
            <ZText style={dayStyles.valueText}>2.000.000</ZText>
            <ZText style={dayStyles.valueText}>VND</ZText>
          </View>
        </View>

        <View style={dayStyles.row}>
          <ZText style={dayStyles.label}>Change</ZText>
          <View style={dayStyles.value}>
            <ZText style={[dayStyles.change, dayStyles.valueText]}>+</ZText>
            <ZText style={[dayStyles.change, dayStyles.valueText]}>
              98.000.000
            </ZText>
            <ZText style={[dayStyles.change, dayStyles.valueText]}>VND</ZText>
            <ZText style={[dayStyles.change, dayStyles.valueText]}>
              (5000%)
            </ZText>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Calendar
