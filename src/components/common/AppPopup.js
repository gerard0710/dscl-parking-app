import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'

import { FirebaseContext } from '../../firebase/firebaseContext'

const useStyles = makeStyles(theme => ({
  media: {
    height: 140
  },
  addBtn: {
    marginBottom: theme.spacing(2)
  },
  closeBtn: {
    margin: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

const AddPopup = ({ content }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className={classes.addBtn}
      >
        Add
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Button onClick={handleClose} className={classes.closeBtn}>
          Close
        </Button>
        {content}
      </Popover>
    </div>
  )
}

export default AddPopup
