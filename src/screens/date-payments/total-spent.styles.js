import { StyleSheet } from 'react-native'

import { palette } from '../../config'

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 12,
  },
  title: {
    color: palette.grey,
    marginBottom: 6,
  },
  priceWithUnit: {
    flexDirection: 'row',
  },
  price: {
    marginRight: 6,
  },
})
