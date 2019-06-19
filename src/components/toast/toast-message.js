import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Header } from 'react-navigation'
import Constants from 'expo-constants'
import { AntDesign } from '@expo/vector-icons'

import { palette } from '../../config'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.transparent,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 9,
  },
  topToast: {
    top: Header.HEIGHT + Constants.statusBarHeight + 16,
  },
  bottomToast: {
    bottom: 24,
  },
  inner: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 24,
    paddingLeft: 24,
    borderRadius: 20,
    maxWidth: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBackground: {
    backgroundColor: palette.red[1],
  },
  successBackground: {
    backgroundColor: palette.green,
  },
  text: {
    color: palette.white,
    textAlign: 'center',
    fontSize: 14,
  },
  icon: {
    textAlign: 'center',
    marginRight: 12,
    color: palette.white,
  },
})

function ToastMessage({ toast, onPress }) {
  const { message, type, position } = toast
  const background =
    type === 'error' ? styles.errorBackground : styles.successBackground
  const iconName = type === 'error' ? 'close' : 'check'
  const positionStyle =
    position === 'top' ? styles.topToast : styles.bottomToast

  return (
    <View style={[styles.wrapper, positionStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.inner, background]}>
          <AntDesign name={iconName} size={20} style={styles.icon} />
          <Text style={styles.text}>{message}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ToastMessage
