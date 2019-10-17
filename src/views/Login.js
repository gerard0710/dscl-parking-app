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
      state.setUser(user)
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
            details: {
              displayName,
              email
            }
          }

          dispatch({ type: 'addUser', payload })
        }

        return false
      }
    }
  }

  return (
    <div>
      <AppHeader></AppHeader>
      {state.user ? (
        <Redirect to="/home"></Redirect>
      ) : (
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
      )}
    </div>
  )
}

export default Login
