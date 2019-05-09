import React from 'react'
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function Button({ children, style, onPress }) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.container, style]}>{children}</View>
    </TouchableNativeFeedback>
  )
}

export default Button
