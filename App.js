import React from 'react'

import './src/locales'
import Bootstrap from './src/bootstrap'
import { DbProvider } from './src/db'

export default function App() {
  return (
    <DbProvider>
      <Bootstrap />
    </DbProvider>
  )
}
