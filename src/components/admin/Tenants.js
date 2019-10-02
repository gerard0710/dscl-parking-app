import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

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

const Tenants = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <AppTable title="Tenants" data={rows} withAction={true}></AppTable>
    </Paper>
  )
}

export default Tenants
