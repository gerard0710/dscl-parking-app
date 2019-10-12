import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { FirebaseContext } from './firebase/firebaseContext'

export default ({ component: Component, ...routeProps }) => {
  const { state } = useContext(FirebaseContext)
  const { user } = state

  return (
    <Route
      {...routeProps}
      render={props =>
        user ? <Component {...props}></Component> : <Redirect to="/"></Redirect>
      }
    ></Route>
  )
}
