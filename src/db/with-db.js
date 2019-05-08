import React from 'react'

import { DbConsumer } from './db-context'

export default function withDb(Component) {
  const WithDb = props => (
    <DbConsumer>{context => <Component {...props} {...context} />}</DbConsumer>
  )

  return WithDb
}
