import React from 'react'
import { Text, StyleSheet } from 'react-native'

const weightStyles = StyleSheet.create({
  normal: {
    fontFamily: 'OpenSans-Regular',
  },
  semiBold: {
    fontFamily: 'OpenSans-SemiBold',
  },
  bold: {
    fontFamily: 'OpenSans-Bold',
  },
})

const sizeStyles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 22,
  },
  normal: {
    fontSize: 16,
    lineHeight: 24,
  },
  large: {
    fontSize: 18,
    lineHeight: 28,
  },
  xlarge: {
    fontSize: 20,
    lineHeight: 30,
  },
  xxlarge: {
    fontSize: 24,
    lineHeight: 36,
  },
})

function ZText({ children, style, size, weight, numberOfLines }) {
  const sizeStyle = sizeStyles[size]
  const weightStyle = weightStyles[weight]

  return (
    <Text style={[weightStyle, sizeStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  )
}

ZText.defaultProps = {
  weight: 'normal',
  size: 'normal',
  numberOfLines: 1,
}

export default ZText
