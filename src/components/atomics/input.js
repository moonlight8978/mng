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

function ZInput({ children, style, size, weight }) {
  const sizeStyle = sizeStyles[size]
  const weightStyle = weightStyles[weight]

  return <Text style={[weightStyle, sizeStyle, style]}>{children}</Text>
}

ZInput.defaultProps = {
  weight: 'normal',
  size: 'normal',
}

export default ZInput
