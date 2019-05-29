import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ZBox, ZText } from '../../components/atomics'

import { styles } from './payment.styles'
import { NumberUtils } from '../../utils'

function Payment({ payment, style }) {
  const { id, purpose, price, category } = payment
  const { value, unit } = NumberUtils.toShorten(price)

  return (
    <ZBox style={[styles.container, style]} key={id}>
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
        <ZText style={styles.priceUnit}>₫</ZText>
      </View>

      <View style={styles.divider} />
    </ZBox>
  )
}

export default Payment
