import React from 'react'
import { View, StyleSheet } from 'react-native'

import { palette } from '../../../config'
import ZText from '../text'

const styles = StyleSheet.create({
  error: {
    color: palette.red[1],
  },
})

function ValidationMessage({ type, message, style }) {
  return (
    <View style={style}>
      <ZText style={styles.error}>{message}</ZText>
    </View>
  )
}

export default ValidationMessage
