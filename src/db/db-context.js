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

  add = (date, payment) => {
    return new Promise(resolve => {
      this.setState(
        state => ({ db: selectors.add(date, payment)(state.db) }),
        async () => {
          await this.persistState()
          resolve()
        }
      )
    })
  }

  update = () => {}

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
      this.props.toast.push({ message: error.message })
    }
  }

  render() {
    return (
      <DbContext.Provider
        {...this.props}
        value={{
          ...this.state,
          setDb: this.setDb,
          updatePayment: this.update,
          dbSelectors: selectors,
          addPayment: this.add,
        }}
      />
    )
  }
}

const DbProviderWithToast = withToast(DbProvider)

export { DbProviderWithToast as DbProvider }

export const DbConsumer = DbContext.Consumer
