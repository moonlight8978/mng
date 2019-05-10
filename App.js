import React from 'react'

import './src/locales'
import Bootstrap from './src/bootstrap'
import { DbProvider } from './src/db'
import { ToastProvider } from './src/components/toast'

export default function App() {
  return (
    <ToastProvider>
      <DbProvider>
        <Bootstrap />
      </DbProvider>
    </ToastProvider>
  )
}
