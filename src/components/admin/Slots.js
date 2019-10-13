import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import AppTable from '../common/AppTable'

// Generate Order Data
function createData(number, owner, ownershipDate, tenant, status) {
  return { number, owner, ownershipDate, tenant, status }
}

const rows = [
  createData(1, 'Elvis Presley', 'Sep 23 - 27, 2019', 'John Smith', 'Occupied'),
  createData(2, 'Paul McCartney', 'Sep 23 - 27, 2019', 'John Smith', 'Vacant'),
  createData(
    3,
    'Tom Scholz',
    'Sep 23 - 27, 2019',
    'John Smith',
    'Temporarily Occupied'
  ),
  createData(
    4,
    'Michael Jackson',
    'Sep 23 - 27, 2019',
    'John Smith',
    'Occupied'
  ),
  createData(
    5,
    'Bruce Springsteen',
    'Sep 23 - 27, 2019',
    'John Smith',
    'Vacant'
  )
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

const Slots = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <AppTable title="Parking Slots" data={rows}></AppTable>
    </Paper>
  )
}

export default Slots
