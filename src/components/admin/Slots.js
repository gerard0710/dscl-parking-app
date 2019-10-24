import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { FirebaseContext } from '../../firebase/firebaseContext'
import AppTable from '../common/AppTable'
import AppPopup from '../common/AppPopup'

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  card: {
    maxWidth: 345
  }
}))

const Slots = () => {
  const classes = useStyles()
  const { app, dispatch } = useContext(FirebaseContext)
  const [slots, setSlots] = useState(null)
  const [slotName, setSlotName] = useState('')

  const slotRef = app.database().ref('/slots')

  useEffect(() => {
    slotRef.on('value', snapshot => {
      setSlots(snapshot.val())
    })
  }, [])

  const handleChange = e => {
    setSlotName(e.target.value)
  }

  const handleSubmit = () => {
    const slotRef = app.database().ref('/slots')
    const slot = {
      isOpen: true,
      title: slotName
    }

    const key = slotRef.push().key

    dispatch({ type: 'addSlot', payload: { key, slot } })
  }

  const actions = ['edit', 'delete']

  return (
    <React.Fragment>
      <AppPopup
        content={
          <Card className={classes.card}>
            <CardContent>
              <TextField
                id="outlined-name"
                label="Name"
                className={classes.textField}
                value={slotName}
                margin="normal"
                variant="outlined"
                onChange={e => handleChange(e)}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Send
              </Button>
            </CardActions>
          </Card>
        }
      ></AppPopup>
      <Paper className={classes.paper}>
        <AppTable
          title="Parking Slots"
          data={slots}
          actions={actions}
          booleanSwitch
          firebaseRef={`slots`}
        ></AppTable>
      </Paper>
    </React.Fragment>
  )
}

export default Slots
