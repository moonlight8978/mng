import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ZText } from '../../components/atomics'
import { palette } from '../../config'

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  inner: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    aspectRatio: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    flex: 1,
    paddingLeft: 12,
  },
})

export default class CategoryItem extends PureComponent {
  render() {
    const { category } = this.props
    const { name, iconName } = category

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={iconName} size={28} color={palette.cyan} />
          </View>
          <View style={styles.nameContainer}>
            <ZText>{name}</ZText>
          </View>
        </View>
      </View>
    )
  }
}
