import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'

import { FirebaseContext } from '../../firebase/firebaseContext'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}))

const AppHeader = props => {
  const { isOpen, handleDrawerOpen, isPublic, history, match } = props

  const classes = useStyles()

  const { app, state, dispatch } = useContext(FirebaseContext)

  const signOut = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'setUser', payload: null })
        history.push('/')
      })
  }

  const handleRedirect = () => {
    if (match && match.path === '/home') {
      history.push('/admin')
    } else if (match && match.path === '/admin') {
      history.push('/home')
    }
  }

  const buildHeaderButtons = () => {
    const { user } = state
    let ui = []

    if (user) {
      ui.push(
        <Button color="inherit" onClick={signOut} key={`${user.uid}-logout`}>
          Logout
        </Button>
      )

      if (user.isAdmin) {
        ui.push(
          <Button
            color="inherit"
            onClick={handleRedirect}
            key={`${user.uid}-auxbtn`}
          >
            Go to {match && match.path === '/home' ? 'Admin' : 'Home'}
          </Button>
        )
      }
    }

    return ui
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, isOpen && classes.appBarShift)}
      >
        <Toolbar>
          {isPublic ? null : (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={clsx(
                classes.menuButton,
                isOpen && classes.menuButtonHidden
              )}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            DSCL Manila Parking
          </Typography>

          {buildHeaderButtons()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppHeader
