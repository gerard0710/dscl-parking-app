import React, { useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { FirebaseContext } from '../../firebase/firebaseContext'
import AppTable from '../common/AppTable'
import AddSlotPopup from './AddSlotPopup'

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
  const { app } = useContext(FirebaseContext)
  const [slots, setSlots] = useState(null)

  const slotRef = app.database().ref('/slots')

  useEffect(() => {
    slotRef.on('value', snapshot => {
      setSlots(snapshot.val())
    })
  }, [])

  const actions = ['edit', 'delete']

  return (
    <React.Fragment>
      <AddSlotPopup></AddSlotPopup>
      <Paper className={classes.paper}>
        <AppTable
          title="Parking Slots"
          data={slots}
          actions={actions}
        ></AppTable>
      </Paper>
    </React.Fragment>
  )
}

export default Slots
