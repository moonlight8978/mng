import React from 'react'
import { View, BackHandler } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ZText, ZButton } from '../../components/atomics'
import { DrawerToggler } from '../../components/navigation'
import { palette } from '../../config'

const categories = [
  { name: 'Shopping', iconName: 'shopping-cart', id: '1' },
  { name: 'Shopping', iconName: 'shopping-cart', id: '2' },
  { name: 'Shopping', iconName: 'shopping-cart', id: '3' },
  { name: 'Shopping', iconName: 'shopping-cart', id: '4' },
]

class CategoryListItem extends React.PureComponent {
  render() {
    const { category } = this.props
    const { name, iconName } = category

    return (
      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons name={iconName} size={28} color={palette.cyan} />
        <ZText>{name}</ZText>
      </View>
    )
  }
}

class Categories extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'Category',
    headerLeft: <DrawerToggler color={palette.white} />,
  })

  render() {
    return (
      <View style={{ flex: 1 }}>
        {categories.map(category => (
          <CategoryListItem key={category.id} category={category} />
        ))}
      </View>
    )
  }
}

export default Categories
