import React from 'react'
import { AsyncStorage } from 'react-native'

import selectors from './db.selectors'
import { withToast } from '../components/toast'

const defaultState = {
  payments: {},
  categories: {},
  calendar: {},
}

const DbContext = React.createContext(defaultState)

class DbProvider extends React.PureComponent {
  state = {
    db: defaultState,
  }

  setDb = db => this.setState(state => ({ db: { ...state.db, ...db } }))

  setStateAsync = updater => {
    return new Promise(resolve => {
      this.setState(updater, async () => {
        await this.persistState()
        resolve()
      })
    })
  }

  addPayment = (date, payment) => {
    return this.setStateAsync(state => ({
      db: selectors.addPayment(date, {
        ...payment,
        id: this.generateUniqueId(),
      })(state.db),
    }))
  }

  updatePayment = () => {}

  addCategory = category => {
    return this.setStateAsync(state => ({
      db: selectors.addCategory({
        ...category,
        id: this.generateUniqueId(),
      })(state.db),
    }))
  }

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
          addCategory: this.addCategory,
        }}
      />
    )
  }
}

const DbProviderWithToast = withToast(DbProvider)

export { DbProviderWithToast as DbProvider }

export const DbConsumer = DbContext.Consumer
