import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { FirebaseContext } from '../../firebase/firebaseContext'

import AppTable from '../common/AppTable'

// Generate Order Data
function createData(id, firstName, lastName) {
  return { id, firstName, lastName }
}

const rows = [
  createData(1, 'Elvis', 'Presley'),
  createData(2, 'Paul', 'McCartney'),
  createData(3, 'Tom', 'Scholz'),
  createData(4, 'Michael', 'Jackson'),
  createData(5, 'Bruce', 'Springsteen')
]

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

const Users = () => {
  const classes = useStyles()
  const { app } = useContext(FirebaseContext)
  const [users, setUsers] = useState(null)

  useEffect(() => {
    app.users().on('value', snapshot => {
      setUsers(snapshot.val())
    })
  }, [users])

  console.log('>>>>', users)

  return (
    <Paper className={classes.paper}>
      <AppTable title="Users" data={rows} withAction={true}></AppTable>
    </Paper>
  )
}

export default Users
