import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { AppContext } from '../Firebase'
import Copyright from '../components/common/Copyright'
import AppHeader from '../components/layout/AppHeader'

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

export default function SignIn() {
  const classes = useStyles()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const firebase = useContext(AppContext)

  return (
    <div>
      <AppHeader></AppHeader>
      {isSignedIn ? (
        <Redirect to="/home"></Redirect>
      ) : (
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <StyledFirebaseAuth
              uiConfig={firebase.getUiConfig()}
              firebaseAuth={firebase.getAuth()}
            />
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </div>
  )
}
