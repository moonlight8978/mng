import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eceff1',
    flex: 1,
  },
})

function Layout(props) {
  return <SafeAreaView {...props} style={styles.container} />
}

export default Layout
