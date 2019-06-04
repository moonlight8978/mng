import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation'

import { ZButton } from '../atomics'

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
  },
  button: {
    width: 40,
  },
})

function DrawerToggler({ color, navigation }) {
  return (
    <View style={styles.container}>
      <ZButton onPress={navigation.openDrawer} style={styles.button}>
        <MaterialIcons name="menu" size={28} color={color} />
      </ZButton>
    </View>
  )
}

export default withNavigation(DrawerToggler)
