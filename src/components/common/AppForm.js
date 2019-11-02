import React, { useEffect, useState, useContext } from 'react'

import Select from 'react-select'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { FirebaseContext } from '../../firebase/firebaseContext'
import {
  CardActions,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  makeStyles
} from '@material-ui/core'

const selectStyles = {
  control: () => ({
    width: 400,
    height: 50,
    marginBottom: '5px',
    display: 'flex',
    border: '1px solid lightgray',
    borderRadius: 5
  })
}

function AppForm() {
  const [formState, setFormState] = useState({})
  const [users, setUsers] = useState([])
  const { app, state, dispatch } = useContext(FirebaseContext)

  useEffect(() => {
    const usersRef = '/users'
    app
      .database()
      .ref(state.firebaseRef)
      .once('value', snapshot => {
        setFormState(snapshot.val())
      })

    app
      .database()
      .ref(usersRef)
      .once('value', snapshot => {
        const usersObj = snapshot.val()
        let usersTemp = []
        Object.entries(usersObj).forEach(([key, value]) => {
          usersTemp.push({ value: key, label: value.displayName })
        })
        setUsers(usersTemp)
      })
  }, [])

  const handleChange = e => {
    e.persist()
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleAutocompleteChange = (selected, name) => {
    setFormState({ ...formState, [name]: selected.label })
  }

  const handleSubmit = () => {
    dispatch({
      type: 'editSchedule',
      payload: { scheduleDetails: formState, isDialogOpen: false }
    })
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
          if (state.autocomplete && state.autocomplete.includes(key)) {
            let options = []
            switch (key) {
              case 'owner':
              case 'tenant':
                options = users
                break
              case 'status':
                options = [
                  { value: 'Vacant', label: 'Vacant' },
                  { value: 'Occupied', label: 'Occupied' },
                  {
                    value: 'Temporarily Occupied',
                    label: 'Temporarily Occupied'
                  }
                ]
                break
              default:
                break
            }
            if (key === 'owner' || key === 'tenant') {
              if (users) {
                options = users
              }
            }
            ui.push(
              <Select
                options={options}
                fullWidth
                key={key}
                styles={selectStyles}
                placeholder={key}
                name={key}
                onChange={e => handleAutocompleteChange(e, key)}
              ></Select>
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
