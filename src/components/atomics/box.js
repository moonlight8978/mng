import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
})

function Box({ style, children }) {
  return <View style={[style, styles.container]}>{children}</View>
}

export default Box
