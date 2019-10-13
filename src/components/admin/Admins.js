import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'

import AddIcon from '@material-ui/icons/Add'

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
  form: {
    marginTop: theme.spacing(5)
  },
  modal: {
    margin: 'auto',
    width: '40%',
    marginTop: '5%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  fab: {
    position: 'absolute',
    right: '5%'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

const Admins = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Paper className={classes.paper}>
      <Fab onClick={handleOpen} className={classes.fab}>
        <AddIcon></AddIcon>
      </Fab>
      <AppTable title="Admins" data={rows} withAction={true}></AppTable>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.modal}>
          <h2 id="simple-modal-title">Add Admin</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>
    </Paper>
  )
}

export default Admins
