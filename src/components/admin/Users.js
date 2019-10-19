import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    maxWidth: 345
  },
  switch: {
    marginLeft: theme.spacing(1)
  }
}))

const Users = () => {
  const classes = useStyles()
  const { app, dispatch } = useContext(FirebaseContext)
  const [users, setUsers] = useState(null)
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    isAdmin: false,
    password: ''
  })

  const usersRef = app.database().ref('/users')

  useEffect(() => {
    usersRef.on('value', snapshot => {
      setUsers(snapshot.val())
    })
  }, [])

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSwitch = e => {
    setUser({ ...user, [e.target.name]: e.target.checked })
  }

  const handleSubmit = () => {
    dispatch({ type: 'addAuthUser', payload: user })
  }

  return (
    <React.Fragment>
      <AppPopup
        content={
          <Card className={classes.card}>
            <CardContent>
              <form className={classes.container}>
                <TextField
                  id="outlined-name"
                  label="Email"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={e => handleChange(e)}
                  name={'email'}
                  value={user.email}
                />
                <TextField
                  id="outlined-name"
                  label="Password"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={e => handleChange(e)}
                  name={'password'}
                  value={user.password}
                />
                <TextField
                  id="outlined-name"
                  label="First name & Last name"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={e => handleChange(e)}
                  name={'displayName'}
                  value={user.displayName}
                />
              </form>
            </CardContent>
            <CardActions>
              <FormControlLabel
                className={classes.switch}
                control={
                  <Switch
                    value={user.isAdmin}
                    onChange={e => handleSwitch(e)}
                    name={'isAdmin'}
                  />
                }
                label="Is Admin?"
              />
              <Button size="small" color="primary" onClick={handleSubmit}>
                Send
              </Button>
            </CardActions>
          </Card>
        }
      ></AppPopup>
      <Paper className={classes.paper}>
        <AppTable
          title="Users"
          data={users}
          actions={['edit', 'delete']}
          booleanSwitch
        ></AppTable>
      </Paper>
    </React.Fragment>
  )
}

export default Users
