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
    backgroundColor: '#B71C1C',
    width: '60%',
    aspectRatio: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    borderRadius: 999,
  },
  dayOfMonth: {
    color: '#FFF',
  },
})

export const dayStyles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  title: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  label: {
    color: '#9E9E9E',
    flex: 0.4,
  },
  value: {
    flexDirection: 'row',
    flex: 0.6,
    justifyContent: 'flex-end',
  },
  change: {
    color: '#4caf50',
  },
  valueText: {
    marginLeft: 6,
  },
})
