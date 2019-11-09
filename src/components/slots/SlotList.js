import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import CheckIcon from '@material-ui/icons/Check'
import NotificationsIcon from '@material-ui/icons/Notifications'
import CloseIcon from '@material-ui/icons/Close'

import { FirebaseContext } from '../../firebase/firebaseContext'

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'block'
  },
  button: {
    marginTop: theme.spacing(3)
  }
}))

const SlotList = props => {
  const { slot, id, scheduleKey } = props
  const classes = useStyles()
  const { state, dispatch } = useContext(FirebaseContext)

  let primaryAction = null
  let headingText = `${slot.title} - `
  let btnAction = null

  if (slot.status.toLowerCase() === 'occupied') {
    if (slot.tenant === state.user.displayName) {
      primaryAction = <CloseIcon></CloseIcon>
      btnAction = () => {
        dispatch({
          type: 'vacateSlot',
          payload: { id, firebaseRef: `schedules/${scheduleKey}/slots/${id}` }
        })
      }
    }

    if (slot.isTemporary) {
      headingText += ' Temporarily'
      if (slot.owner === state.user.displayName) {
        primaryAction = <NotificationsIcon></NotificationsIcon>
        btnAction = () => {
          console.log('IN notify')
        }
      }
    }
  } else {
    if (!state.slot) {
      if (slot.tenant !== state.user.displayName) {
        primaryAction = <CheckIcon></CheckIcon>
        btnAction = () => {
          dispatch({
            type: 'occupySlot',
            payload: { id, firebaseRef: `schedules/${scheduleKey}/slots/${id}` }
          })
        }
      }
    }
  }

  headingText += ` ${slot.status}`

  console.log(state)

  return (
    <React.Fragment>
      <CssBaseline />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={slot.owner}>{slot.owner.charAt(0)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={headingText}
          secondary={
            <React.Fragment>
              <Typography component="span">Owner : {slot.owner}</Typography>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Tenant : {slot.tenant}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          {primaryAction ? (
            <IconButton onClick={btnAction}>{primaryAction}</IconButton>
          ) : null}
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  )
}

export default SlotList
