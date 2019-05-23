import React from 'react'
import { View, BackHandler } from 'react-native'

import { ZText, ZButton } from '../../components/atomics'
import { DrawerToggler } from '../../components/navigation'
import { palette } from '../../config'

class Categories extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <DrawerToggler color={palette.white} />,
  })

  render() {
    return (
      <View>
        <ZText>Categories screen</ZText>
        <ZButton onPress={() => BackHandler.exitApp()}>
          <ZText>asdasd</ZText>
        </ZButton>
      </View>
    )
  }
}

export default Categories
