import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'

import Copyright from '../components/common/Copyright'
import AppHeader from '../components/layout/AppHeader'

import { FirebaseContext } from '../firebase/firebaseContext'

import getSunday from '../utils/sundaySelector'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.gray
    }
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main
  }
}))

const Login = () => {
  const { app, state, dispatch } = useContext(FirebaseContext)
  const classes = useStyles()

  useEffect(() => {
    const unregisterAuthObserver = app.auth().onAuthStateChanged(user => {
      if (user) {
        const userRef = app.database().ref(`/users/${user.uid}`)
        const scheduleSlotsRef = app.database().ref('/schedules/')

        userRef.once('value').then(snapshot => {
          const currentUser = snapshot.val()
          dispatch({
            type: 'setUser',
            payload: { user: { ...currentUser, uid: user.uid } }
          })
        })

        scheduleSlotsRef
          .orderByChild('startDate')
          .startAt(getSunday())
          .once('value', snapshot => {
            // console.log('>>>', snapshot.val())
            if (snapshot.val()) {
              let currentSlots = {}
              let _thisUser
              let occupied
              Object.entries(snapshot.val()).forEach(([key, value]) => {
                currentSlots = value.slots
              })

              userRef.once('value').then(snapshot => {
                _thisUser = snapshot.val()

                occupied = Object.entries(currentSlots).filter(
                  ([key, value]) => {
                    return value.tenant === _thisUser.displayName
                  }
                )

                if (occupied.length > 0) {
                  occupied = occupied[0]

                  dispatch({
                    type: 'setCurrentSlot',
                    payload: { slot: { [occupied[0]]: occupied[1] } }
                  })
                }
              })
            }
          })
      }
    })
    return () => unregisterAuthObserver()
  }, [])

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        if (authResult.additionalUserInfo.isNewUser) {
          const { displayName, email, uid } = authResult.user
          const payload = {
            uid,
            userDetails: {
              displayName,
              email,
              isAdmin: false
            }
          }

          dispatch({ type: 'addUser', payload })
        }

        return false
      }
    }
  }

  const displayLogin = () => {
    const { user } = state
    let ui = (
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
    if (user) {
      if (user.isAdmin) {
        ui = <Redirect to="/admin"></Redirect>
      } else {
        ui = <Redirect to="/home"></Redirect>
      }
    }

    return ui
  }

  return (
    <div>
      <AppHeader></AppHeader>
      {displayLogin()}
    </div>
  )
}

export default Login
