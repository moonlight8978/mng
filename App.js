import React from 'react'
import Sentry from 'sentry-expo'

import './src/locales'
import Bootstrap from './src/bootstrap'
import { DbProvider } from './src/db'
import { ToastProvider } from './src/components/toast'
import { settings } from './src/config'

Sentry.enableInExpoDevelopment = true
Sentry.config(settings.sentry.uri).install()

export default function App() {
  return (
    <ToastProvider>
      <DbProvider>
        <Bootstrap />
      </DbProvider>
    </ToastProvider>
  )
}
