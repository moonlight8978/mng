import React from 'react'
import { AsyncStorage } from 'react-native'

import selectors from './db.selectors'

const DbContext = React.createContext({})

class DbProvider extends React.PureComponent {
  state = {
    db: {},
  }

  setDb = db => this.setState({ db })

  update = ({ month, year, date }) => {
    this.setState(
      state => ({ db: { ...state.db } }),
      () => {
        AsyncStorage.setItem('db', JSON.stringify(this.state.db))
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
          update: this.update,
          dbSelectors: selectors,
        }}
      />
    )
  }
}

export { DbProvider }

export const DbConsumer = DbContext.Consumer
