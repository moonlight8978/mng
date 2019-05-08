import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
