import React, { useEffect, useState, useContext } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { FirebaseContext } from '../../firebase/firebaseContext'
import {
  CardActions,
  Button,
  FormControlLabel,
  Switch,
  TextField
} from '@material-ui/core'
import { async } from 'q'

function AppForm() {
  const [formState, setFormState] = useState({})
  const { app, state, dispatch } = useContext(FirebaseContext)

  useEffect(() => {
    app
      .database()
      .ref(state.firebaseRef)
      .once('value', snapshot => {
        setFormState(snapshot.val())
      })
  }, [])

  const handleChange = e => {
    e.persist()
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    dispatch({ type: 'editSchedule', payload: formState })
  }

  const buildForm = () => {
    let ui = []

    if (formState) {
      Object.entries(formState).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          ui.push(
            <FormControlLabel
              key={key}
              control={<Switch checked={value} value={formState[key]}></Switch>}
              label={key}
            ></FormControlLabel>
          )
        } else {
          ui.push(
            <TextField
              key={key}
              id="outlined-name"
              label={key}
              value={formState[key]}
              margin="normal"
              variant="outlined"
              fullWidth
              name={key}
              onChange={e => handleChange(e)}
            />
          )
        }
      })
    }

    return ui
  }

  return (
    <Card>
      <CardContent>{buildForm()}</CardContent>
      <CardActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </CardActions>
    </Card>
  )
}

export default AppForm
