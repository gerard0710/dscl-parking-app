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

const SlotList = ({ slot }) => {
  const classes = useStyles()
  const { state } = useContext(FirebaseContext)

  let primaryAction = null
  let secondaryAction = null
  let headingText = `${slot.title} - `

  if (slot.status.toLowerCase() === 'occupied') {
    if (slot.isTemporaryOwner) {
      headingText += ' Temporarily'
      if (slot.owner === state.user.displayName) {
        primaryAction = <NotificationsIcon></NotificationsIcon>
      }
    } else {
      primaryAction = <CloseIcon></CloseIcon>
    }
  } else {
    primaryAction = <CheckIcon></CheckIcon>
    secondaryAction = (
      <Button variant="contained" size="small" className={classes.button}>
        Occupy
      </Button>
    )
  }

  headingText += ` ${slot.status}`

  return (
    <React.Fragment>
      <CssBaseline />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="John Smith"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          />
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
              {secondaryAction}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          {primaryAction ? <IconButton>{primaryAction}</IconButton> : null}
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  )
}

export default SlotList
