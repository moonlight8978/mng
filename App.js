import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Constants, Font } from 'expo'

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#C2185B',
    height: Constants.statusBarHeight,
  },
})

function loadFonts() {
  return Font.loadAsync({
    'OpenSans-Bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'OpenSans-BoldItalic': require('./assets/fonts/OpenSans/OpenSans-BoldItalic.ttf'),
    'OpenSans-ExtraBold': require('./assets/fonts/OpenSans/OpenSans-ExtraBold.ttf'),
    'OpenSans-ExtraBoldItalic': require('./assets/fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf'),
    'OpenSans-Italic': require('./assets/fonts/OpenSans/OpenSans-Italic.ttf'),
    'OpenSans-Light': require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
    'OpenSans-LightItalic': require('./assets/fonts/OpenSans/OpenSans-LightItalic.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
    'OpenSans-SemiBoldItalic': require('./assets/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf'),
  })
}

export default class App extends React.Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
    try {
      await loadFonts()
      this.setState({ isLoading: false })
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    const { isLoading } = this.state

    return (
      <View>
        <View style={styles.statusBar} />
        {isLoading ? <Text>Loading</Text> : <Text>OK</Text>}
      </View>
    )
  }
}
