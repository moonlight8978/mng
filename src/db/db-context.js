import React from 'react'
import { AsyncStorage } from 'react-native'

import selectors from './db.selectors'
import { withToast } from '../components/toast'

const DbContext = React.createContext({})

class DbProvider extends React.PureComponent {
  state = {
    db: {},
  }

  setDb = db => this.setState({ db })

  addPayment = (date, payment) => {
    return new Promise(resolve => {
      this.setState(
        state => ({
          db: selectors.addPayment(date, {
            ...payment,
            id: this.generateUniqueId(),
          })(state.db),
        }),
        async () => {
          await this.persistState()
          resolve()
        }
      )
    })
  }

  updatePayment = () => {}

  tryPersistState = async () => {
    for (let triesCount = 1; triesCount <= 5; triesCount += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await AsyncStorage.setItem('db', JSON.stringify(this.state.db))
        return null
      } catch (error) {
        if (triesCount === 5) {
          throw error
        }
      }
    }
  }

  persistState = async () => {
    try {
      await this.tryPersistState()
    } catch (error) {
      this.props.toast.push({ message: error.message.toString() })
    }
  }

  generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function uuid(c) {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }

  render() {
    return (
      <DbContext.Provider
        {...this.props}
        value={{
          ...this.state,
          setDb: this.setDb,
          updatePayment: this.updatePayment,
          dbSelectors: selectors,
          addPayment: this.addPayment,
        }}
      />
    )
  }
}

const DbProviderWithToast = withToast(DbProvider)

export { DbProviderWithToast as DbProvider }

export const DbConsumer = DbContext.Consumer
