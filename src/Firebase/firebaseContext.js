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
    schedules: null,
    isDialogOpen: false,
    firebaseRef: '',
    slot: null
  }

  const reducer = (state, action) => {
    let updates = {}

    let {
      id,
      key,
      slot,
      uid,
      userDetails,
      email,
      password,
      displayName,
      isAdmin,
      newKey,
      scheduleDetails,
      slots,
      scheduleRef,
      date,
      user,
      fbRef,
      autocomplete,
      schedules,
      isDialogOpen,
      firebaseRef
    } = action.payload

    let selectedSlot = null

    switch (action.type) {
      case 'setUser':
        return { ...state, user }

      case 'getUser':
        return state

      case 'deleteUser':
        app
          .database()
          .ref(`/users/${id}`)
          .remove()
        return state

      case 'addSlot':
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
          .ref(`/slots/${id}`)
          .remove()
        return state

      case 'occupySlot':
        console.log(firebaseRef)
        app
          .database()
          .ref(firebaseRef)
          .once('value', snapshot => {
            selectedSlot = snapshot.val()
            let isTemporary = true

            if (selectedSlot.owner === state.user.displayName) {
              isTemporary = false
            }

            selectedSlot = {
              ...selectedSlot,
              tenant: state.user.displayName,
              isTemporary,
              status: 'Occupied'
            }

            updates[firebaseRef] = { ...selectedSlot }

            app
              .database()
              .ref()
              .update(updates)
          })

        return { ...state, slot: selectedSlot }

      case 'vacateSlot':
        app
          .database()
          .ref(firebaseRef)
          .once('value', snapshot => {
            selectedSlot = snapshot.val()

            selectedSlot = {
              ...selectedSlot,
              tenant: '',
              status: 'Vacant',
              isTemporary: null
            }

            updates[firebaseRef] = { ...selectedSlot }

            app
              .database()
              .ref()
              .update(updates)
          })

        return { ...state, slot: null }

      case 'setCurrentSlot':
        return { ...state, slot }

      case 'addUser':
        updates[`/users/${uid}`] = userDetails
        app
          .database()
          .ref()
          .update(updates)
        return state

      case 'addAuthUser':
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
        return { ...state, schedules }

      case 'addSchedule':
        updates[`/schedules/${newKey}`] = scheduleDetails
        app
          .database()
          .ref()
          .update(updates)
        return state

      case 'editSchedule':
        updates[state.firebaseRef] = { ...scheduleDetails }
        app
          .database()
          .ref()
          .update(updates)
        return { ...state, isDialogOpen }

      case 'openEditDialog':
        return {
          ...state,
          isDialogOpen: true,
          firebaseRef: fbRef,
          autocomplete
        }

      case 'closeEditDialog':
        return { ...state, isDialogOpen, firebaseRef }

      case 'refreshSchedule':
        updates[`${scheduleRef}/slots`] = slots
        app
          .database()
          .ref()
          .update(updates)
        return state

      case 'deleteScheduleSlot':
        app
          .database()
          .ref(fbRef)
          .once('value', snapshot => {
            const newSchedule = snapshot.val()
            updates[fbRef] = {
              ...newSchedule,
              owner: '',
              tenant: '',
              status: 'Vacant'
            }
          })

        app
          .database()
          .ref()
          .update(updates)
        return state

      case 'deleteSchedule':
        app
          .database()
          .ref(fbRef)
          .remove()
        return state

      case 'editStartDate':
        updates[`${scheduleRef}/startDate`] = date
        app
          .database()
          .ref()
          .update(updates)
        return state

      case 'editEndDate':
        updates[`${scheduleRef}/endDate`] = date
        app
          .database()
          .ref()
          .update(updates)
        return state

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
