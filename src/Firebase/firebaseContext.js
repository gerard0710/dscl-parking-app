import React, { createContext, useState, useReducer } from 'react'
import FirebaseApp from 'firebase/app'
import firebase from 'firebase'

import config from './configs'

const app = FirebaseApp.initializeApp(config)

const FirebaseContext = createContext(null)

export { FirebaseContext }

export default ({ children }) => {
  const initState = {
    user: null,
    schedules: null
  }

  const reducer = (state, action) => {
    let updates = {}
    switch (action.type) {
      case 'setUser':
        return { ...state, user: action.payload }

      case 'getUser':
        return state

      case 'deleteUser':
        app
          .database()
          .ref(`/users/${action.payload}`)
          .remove()
        return state

      case 'addSlot':
        const { key, slot } = action.payload
        updates[`/slots/${key}`] = slot
        app
          .database()
          .ref()
          .update(updates)
        return state

      case 'editSlot':
        updates[`/slots/${action.payload}`] = action.slotData
        app
          .database()
          .ref()
          .update(updates)
        return state

      case 'deleteSlot':
        app
          .database()
          .ref(`/slots/${action.payload}`)
          .remove()
        return state

      case 'addUser':
        const { uid, details } = action.payload
        updates[`/users/${uid}`] = details
        app
          .database()
          .ref()
          .update(updates)
        return state

      case 'addAuthUser':
        const { email, password, displayName, isAdmin } = action.payload

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(authUser => {
            const { user } = authUser
            updates[`/users/${user.uid}`] = { email, displayName, isAdmin }
            app
              .database()
              .ref()
              .update(updates)
          })
        return state

      case 'setSchedule':
        return { ...state, schedules: action.payload }

      default:
        break
    }
  }

  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <FirebaseContext.Provider value={{ app, state, dispatch }}>
      {children}
    </FirebaseContext.Provider>
  )
}
