import React from 'react'
import { View, Picker, StyleSheet } from 'react-native'

import { palette } from '../../../config'

import ZLabel from './label'

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderColor: palette.gray,
  },
  picker: {
    marginLeft: -8,
  },
})

class ZPicker extends React.PureComponent {
  render() {
    const { value, label, required, items, ...rest } = this.props

    return (
      <View style={styles.container}>
        <ZLabel name={label} required={required} />

        <Picker {...rest} style={styles.picker} selectedValue={value}>
          {items.map(item => (
            <Picker.Item {...item} key={item.value} />
          ))}
        </Picker>
      </View>
    )
  }
}

export default ZPicker
