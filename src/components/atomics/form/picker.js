import React from 'react'
import { View, Picker, StyleSheet } from 'react-native'

import { palette } from '../../../config'

import ZLabel from './label'

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderColor: palette.gray,
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 36,
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
    marginLeft: -8,
  },
})

class ZPicker extends React.PureComponent {
  render() {
    const { value, label, required, items, style, icon, ...rest } = this.props

    return (
      <View style={styles.container}>
        <ZLabel name={label} required={required} />

        <View style={styles.input}>
          {icon && <View style={styles.icon}>{icon}</View>}

          <Picker
            {...rest}
            style={[styles.picker, style]}
            selectedValue={value}
          >
            {items.map(item => (
              <Picker.Item {...item} key={item.value} />
            ))}
          </Picker>
        </View>
      </View>
    )
  }
}

export default ZPicker
