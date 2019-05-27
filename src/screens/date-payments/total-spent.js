import React from 'react'
import { View } from 'react-native'
import i18n from 'i18n-js'

import { ZBox, ZText } from '../../components/atomics'
import { NumberUtils } from '../../utils'

import { styles } from './total-spent.styles'

function TotalSpent({ total }) {
  const [totalInteger] = NumberUtils.toLocaleString(total)
  console.log(total.toLocaleString('vi'))

  return (
    <ZBox style={styles.container}>
      <ZText style={styles.title}>{i18n.t('datePayments.total.title')}</ZText>

      <View style={styles.priceWithUnit}>
        {totalInteger.map((part, index) => (
          <ZText
            key={index.toString()}
            size="xxlarge"
            weight="semiBold"
            style={styles.price}
          >
            {part}
          </ZText>
        ))}

        <ZText size="xxlarge" weight="semiBold" style={styles.price}>
          VND
        </ZText>
      </View>
    </ZBox>
  )
}

export default TotalSpent
