import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ZText } from '../../components/atomics'
import { currency } from '../../config'
import { NumberUtils } from '../../utils'

import { styles } from './payment.styles'

function Payment({ payment, style }) {
  const { purpose, price, category } = payment
  const { value, unit } = NumberUtils.toShorten(price)

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={category.iconName} size={30} style={styles.icon} />
      </View>

      <View style={styles.purposeContainer}>
        <ZText style={styles.description}>{purpose}</ZText>
        <ZText size="small" style={styles.category}>
          {category.name}
        </ZText>
      </View>

      <View style={styles.priceContainer}>
        <ZText>
          {value}
          {unit}
        </ZText>
        <ZText style={styles.priceUnit}>{currency.symbol}</ZText>
      </View>
    </View>
  )
}

export default Payment
