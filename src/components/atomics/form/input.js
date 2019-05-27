import React, { Component } from 'react'
import { TextInput, View, StyleSheet, Animated } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { palette } from '../../../config'

import ZText from '../text'
import ZButton from '../button'

import ZLabel from './label'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    paddingVertical: 6,
    margin: 0,
    fontSize: 16,
    color: palette.black,
    lineHeight: 16,
  },
  sensitiveContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  sensitiveIcon: {
    color: palette.grey,
  },
  border: {
    margin: 0,
    padding: 0,
    height: 2,
  },
})

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focusTransition: new Animated.Value(0),
      isHidden: true,
    }

    this.inputRef = React.createRef()

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleToggleIsHidden = this.handleToggleIsHidden.bind(this)
  }

  handleFocus() {
    const { onFocus } = this.props
    this.animateColor(100)
    if (onFocus) onFocus()
  }

  handleBlur() {
    const { onBlur } = this.props
    this.animateColor(0)
    if (onBlur) onBlur()
  }

  handleToggleIsHidden() {
    this.setState(state => ({
      isHidden: !state.isHidden,
    }))
  }

  animateColor(value) {
    const { focusTransition } = this.state
    Animated.timing(focusTransition, {
      toValue: value,
      duration: 150,
    }).start()
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      label,
      onBlur,
      onFocus,
      selectionColor,
      sensitive,
      required,
      ...otherProps
    } = this.props
    /* eslint-enable no-unused-vars */
    const { focusTransition, isHidden } = this.state
    const borderColor = focusTransition.interpolate({
      inputRange: [0, 100],
      outputRange: [palette.grey, palette.cyan],
    })
    const inputStyle = [styles.input, sensitive ? { paddingRight: 60 } : null]

    return (
      <View style={styles.container}>
        <ZLabel name={label} required={required} />
        <TextInput
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={inputStyle}
          selectionColor={palette.grey}
          ref={this.inputRef}
          secureTextEntry={sensitive ? isHidden : false}
          {...otherProps}
        />
        {sensitive && (
          <View style={styles.sensitiveContainer}>
            <ZButton transparent onPress={this.handleToggleIsHidden}>
              <FontAwesome
                name={isHidden ? 'eye-slash' : 'eye'}
                style={styles.sensitiveIcon}
                size={24}
              />
            </ZButton>
          </View>
        )}
        <Animated.View
          style={[styles.border, { backgroundColor: borderColor }]}
        />
      </View>
    )
  }
}

Input.defaultProps = {
  sensitive: false,
  required: false,
}

export default Input
