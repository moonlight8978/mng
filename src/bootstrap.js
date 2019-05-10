import React from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { Font } from 'expo'

import { withDb } from './db'
import MNG from './routes'
import { withToast } from './components/toast'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

function loadFonts() {
  /* eslint-disable global-require */
  return Font.loadAsync({
    'OpenSans-Bold': require('../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-BoldItalic': require('../assets/fonts/OpenSans/OpenSans-BoldItalic.ttf'),
    'OpenSans-ExtraBold': require('../assets/fonts/OpenSans/OpenSans-ExtraBold.ttf'),
    'OpenSans-ExtraBoldItalic': require('../assets/fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf'),
    'OpenSans-Italic': require('../assets/fonts/OpenSans/OpenSans-Italic.ttf'),
    'OpenSans-Light': require('../assets/fonts/OpenSans/OpenSans-Light.ttf'),
    'OpenSans-LightItalic': require('../assets/fonts/OpenSans/OpenSans-LightItalic.ttf'),
    'OpenSans-Regular': require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('../assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
    'OpenSans-SemiBoldItalic': require('../assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf'),
  })
}

class Bootstrap extends React.Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
    try {
      await loadFonts()
      const db = await AsyncStorage.getItem('db')
      this.props.setDb(db ? JSON.parse(db) : {})
      this.setState({ isLoading: false })
    } catch (error) {
      this.props.toast.push({ message: error.message })
    }
  }

  render() {
    const { isLoading } = this.state

    return (
      <View style={styles.container}>
        {isLoading ? <Text>Loading</Text> : <MNG />}
      </View>
    )
  }
}

export default withToast(withDb(Bootstrap))
