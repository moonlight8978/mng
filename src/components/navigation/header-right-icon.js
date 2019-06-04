import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ZButton } from '../atomics'
import { palette } from '../../config'

const styles = StyleSheet.create({
  container: {
    paddingRight: 12,
  },
  addButton: {
    backgroundColor: palette.transparent,
    width: 40,
  },
})

function HeaderRightIcon({ icon, onPress }) {
  return (
    <View style={styles.container}>
      <ZButton style={styles.addButton} onPress={onPress}>
        {icon}
      </ZButton>
    </View>
  )
}

export default HeaderRightIcon
