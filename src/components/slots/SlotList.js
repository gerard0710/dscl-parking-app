import React from 'react'

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

import { makeStyles } from '@material-ui/core/styles'

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
  let primaryAction = <CheckIcon></CheckIcon>
  let secondaryAction = null

  if (slot.status === 'Temporarily Occupied') {
    primaryAction = <NotificationsIcon></NotificationsIcon>
  } else if (slot.status === 'Occupied') {
    primaryAction = <CloseIcon></CloseIcon>
  } else {
    secondaryAction = (
      <Button variant="contained" size="small" className={classes.button}>
        Occupy
      </Button>
    )
  }

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
          primary={`${slot.title} - ${slot.status}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {slot.tenant}
              </Typography>
              {secondaryAction}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton>{primaryAction}</IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  )
}

export default SlotList
