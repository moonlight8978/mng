import { StyleSheet } from 'react-native'

import { palette } from '../../config'

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    position: 'relative',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 46,
    justifyContent: 'center',
  },
  icon: {
    color: palette.cyan,
  },
  purposeContainer: {
    flexGrow: 1,
  },
  category: {
    color: palette.gray,
  },
  priceContainer: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  priceUnit: {
    marginLeft: 6,
  },
})
