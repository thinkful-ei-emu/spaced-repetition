import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Context from '../../contexts/Context'

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        <Context.Consumer>
          {Context =>
            !!Context.user.id
              ? <Component {...componentProps} />
              : (
                <Redirect
                  to={{
                    pathname: Context.user.idle ? '/login' : '/register',
                    state: { from: componentProps.location },
                  }}
                />
              )
          }
        </Context.Consumer>
      )}
    />
  )
}
