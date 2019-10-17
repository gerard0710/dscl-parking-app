import React, { createContext, useState, useReducer } from 'react'
import FirebaseApp from 'firebase/app'
import FirebaseDb from 'firebase/database'

import config from './configs'

const app = FirebaseApp.initializeApp(config)

const FirebaseContext = createContext({
  user: null,
  setUser: () => {}
})

export { FirebaseContext }

export default ({ children }) => {
  const slotReducer = (state, action) => {
    let updates = {}
    switch (action.type) {
      case 'addSlot':
        const slotRef = app.database().ref('/slots')
        const newSlot = {
          owner: '',
          status: 'Vacant',
          tenant: '',
          title: action.payload
        }

        const newKey = slotRef.push().key

        updates['/slots/' + newKey] = newSlot
        app
          .database()
          .ref()
          .update(updates)
        break

      case 'editSlot':
        updates[`/slots/${action.payload}`] = action.slotData
        app
          .database()
          .ref()
          .update(updates)
        break

      case 'deleteSlot':
        app
          .database()
          .ref(`/slots/${action.payload}`)
          .remove()
        break

      case 'addUser':
        const { uid, details } = action.payload
        const usersRef = app.database().ref('/users')
        updates[`/users/${uid}`] = details
        app
          .database()
          .ref()
          .update(updates)

      default:
        break
    }
  }

  const initState = {
    user: null,
    setUser: user => {
      setState({ ...state, user: user })
    }
  }

  const [state, setState] = useState(initState)
  const [slotState, dispatch] = useReducer(slotReducer)

  return (
    <FirebaseContext.Provider value={{ app, state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  )
}
