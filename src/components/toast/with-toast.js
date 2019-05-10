import React from 'react'

import { ToastConsumer } from './toast-context'

export default function withToast(Component) {
  const WithToast = ({ forwardRef, ...props }) => (
    <ToastConsumer>
      {toastContext => (
        <Component ref={forwardRef} {...props} toast={toastContext} />
      )}
    </ToastConsumer>
  )

  return WithToast
}
