import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Context from '../../contexts/Context'

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        <Context.Consumer>
          {Context =>
            !!Context.user.id
              ? <Redirect to={'/'} />
              : <Component {...componentProps} />
          }
        </Context.Consumer>
      )}
    />
  )
}
