import { StyleSheet } from 'react-native'
import { palette } from '../../config'

export const headerStyles = StyleSheet.create({
  icon: {
    color: '#48AAE6',
  },
  iconOuter: {
    padding: 4,
  },
})

export const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  calendarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowInner: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  dayOfWeek: {
    color: '#9E9E9E',
  },
  calendarCol: {
    width: '14.285714286%',
    paddingTop: 3,
    paddingBottom: 3,
  },
  colText: {
    textAlign: 'center',
  },
  heatPoint: {
    width: '60%',
    aspectRatio: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    borderRadius: 999,
  },
  selectedDate: {
    borderColor: palette.green,
    borderWidth: 1,
  },
})

export const heatMapStyles = StyleSheet.create({
  point1: {
    backgroundColor: 'transparent',
  },
  text1: {
    color: '#212121',
  },
  point2: {
    backgroundColor: '#EF9A9A',
  },
  text2: {
    color: '#FFF',
  },
  point3: {
    backgroundColor: '#F44336',
  },
  text3: {
    color: '#FFF',
  },
  point4: {
    backgroundColor: '#B71C1C',
  },
  text4: {
    color: '#FFF',
  },
})
