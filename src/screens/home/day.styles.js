import { StyleSheet } from 'react-native'
import { palette } from '../../config'

export const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 6,
  },
  title: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 6,
  },
  label: {
    color: palette.gray,
    flex: 0.4,
  },
  value: {
    flexDirection: 'row',
    flex: 0.6,
    justifyContent: 'flex-end',
  },
  change: {
    color: palette.green,
  },
  valueText: {
    marginLeft: 6,
  },
})
