import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  fluid: {
    flex: 1,
  },
})

function Box({ style, fluid, children }) {
  return (
    <View style={[style, styles.container, fluid ? styles.fluid : {}]}>
      {children}
    </View>
  )
}

Box.defaultProps = {
  fluid: false,
}

export default Box
