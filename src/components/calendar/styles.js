import { StyleSheet } from 'react-native'

export const headerStyles = StyleSheet.create({
  icon: {
    color: '#48AAE6',
  },
  iconOuter: {
    padding: 4,
  },
})

export const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#FFF',
    flex: 1,
  },
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
    paddingLeft: 6,
    paddingRight: 6,
  },
  rowInner: {
    paddingLeft: 6,
    paddingRight: 6,
  },
  dayOfWeek: {
    color: '#9E9E9E',
  },
  calendarCol: {
    width: '14.285714286%',
    paddingTop: 12,
    paddingBottom: 12,
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
