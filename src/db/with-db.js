import React from 'react'

import { DbConsumer } from './db-context'

export default function withDb(Component) {
  const WithDb = ({ forwardRef, ...props }) => (
    <DbConsumer>
      {context => <Component ref={forwardRef} {...props} {...context} />}
    </DbConsumer>
  )

  return WithDb
}
