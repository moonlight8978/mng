import React from 'react'
import { View } from 'react-native'

import { ZText } from '../../components/atomics'
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
      </View>
    )
  }
}

export default Categories
