import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import ToastMessage from './toast-message'

const ToastContext = React.createContext([])

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  app: {
    flex: 1,
  },
})

class ToastProvider extends React.PureComponent {
  state = {
    visibleToast: null,
  }

  componentWillUnmount() {
    this.clearTimeout()
  }

  timeout = null

  push = ({ message, position = 'top', type = 'error' }) => {
    this.setState(state => ({ visibleToast: { message, type, position } }))
    this.clearTimeout()
    this.timeout = setTimeout(() => this.setState({ visibleToast: null }), 3000)
  }

  clearToast = () => {
    this.setState({ visibleToast: null })
  }

  clearTimeout = () => this.timeout && clearTimeout(this.timeout)

  render() {
    const { children } = this.props
    const { visibleToast } = this.state

    return (
      <ToastContext.Provider value={{ push: this.push }}>
        <SafeAreaView style={styles.container}>
          {visibleToast && (
            <ToastMessage toast={visibleToast} onPress={this.clearToast} />
          )}
          {children}
        </SafeAreaView>
      </ToastContext.Provider>
    )
  }
}

export { ToastProvider }
export const ToastConsumer = ToastContext.Consumer
