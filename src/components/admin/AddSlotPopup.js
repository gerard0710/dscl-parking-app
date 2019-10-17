import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { FirebaseContext } from '../../firebase/firebaseContext'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  addBtn: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

const AddSlotPopup = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [values, setValues] = useState('')
  const { dispatch } = useContext(FirebaseContext)

  const handleChange = event => {
    setValues(event.target.value)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAddSlot = () => {
    dispatch({ type: 'addSlot', payload: values })
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
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={values}
              onChange={e => handleChange(e)}
              margin="normal"
              variant="outlined"
            />
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={handleAddSlot}>
              Send
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </div>
  )
}

export default AddSlotPopup
