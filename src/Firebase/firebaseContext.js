import React, { createContext, useState, useContext, useEffect } from 'react'
import FirebaseApp from 'firebase/app'

import config from './configs'

const app = FirebaseApp.initializeApp(config)

const FirebaseContext = createContext({
  user: null,
  setUser: () => {}
})

export { FirebaseContext }

export default ({ children }) => {
  const setUser = user => {
    setState({ user })
  }

  const initState = {
    user: null,
    setUser: setUser
  }

  const [state, setState] = useState(initState)

  return (
    <FirebaseContext.Provider value={{ app, state }}>
      {children}
    </FirebaseContext.Provider>
  )
}
