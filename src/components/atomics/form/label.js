import React from 'react'
import { View, StyleSheet } from 'react-native'

import { palette } from '../../../config'

import ZText from '../text'

const styles = StyleSheet.create({
  label: {
    color: palette.gray,
  },
  container: {
    flexDirection: 'row',
  },
  requiredMark: {
    marginLeft: 2,
    color: palette.red[1],
  },
})

function Label({ name, required }) {
  return (
    <View style={styles.container}>
      <ZText size="small" style={[styles.label]}>
        {name}
      </ZText>
      {required && (
        <ZText size="small" style={styles.requiredMark}>
          *
        </ZText>
      )}
    </View>
  )
}

export default Label
