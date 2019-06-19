import React from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import { SplashScreen } from 'expo'
import * as Font from 'expo-font'
import { Asset } from 'expo-asset'
import Sentry from 'sentry-expo'
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

import { withDb } from './db'
import MNG from './routes'
import { withToast } from './components/toast'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const allFonts = [
  { 'OpenSans-Bold': require('../assets/fonts/OpenSans/OpenSans-Bold.ttf') },
  {
    'OpenSans-BoldItalic': require('../assets/fonts/OpenSans/OpenSans-BoldItalic.ttf'),
  },
  {
    'OpenSans-ExtraBold': require('../assets/fonts/OpenSans/OpenSans-ExtraBold.ttf'),
  },
  {
    'OpenSans-ExtraBoldItalic': require('../assets/fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf'),
  },
  {
    'OpenSans-Italic': require('../assets/fonts/OpenSans/OpenSans-Italic.ttf'),
  },
  { 'OpenSans-Light': require('../assets/fonts/OpenSans/OpenSans-Light.ttf') },
  {
    'OpenSans-LightItalic': require('../assets/fonts/OpenSans/OpenSans-LightItalic.ttf'),
  },
  {
    'OpenSans-Regular': require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  },
  {
    'OpenSans-SemiBold': require('../assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
  },
  {
    'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf'),
  },
  FontAwesome.font,
  AntDesign.font,
  MaterialCommunityIcons.font,
  MaterialIcons.font,
]

const allImages = [require('../assets/drawer-header.png')]

function loadFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font))
}

function loadImages(images) {
  return images.map(image => Asset.fromModule(image).downloadAsync())
}

class Bootstrap extends React.Component {
  state = {
    isReady: false,
  }

  constructor(props) {
    super(props)

    SplashScreen.preventAutoHide()
  }

  async componentDidMount() {
    try {
      await Promise.all([...loadFonts(allFonts), ...loadImages(allImages)])
      const db = await AsyncStorage.getItem('db')
      this.props.setDb(db ? JSON.parse(db) : {})
      this.setState({ isReady: true }, SplashScreen.hide)
    } catch (error) {
      Sentry.captureException(error)
      this.props.toast.push({ message: error.message })
    }
  }

  render() {
    const { isReady } = this.state

    if (!isReady) {
      return null
    }

    return (
      <View style={styles.container}>
        <MNG />
      </View>
    )
  }
}

export default withToast(withDb(Bootstrap))
