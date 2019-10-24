import React, { useContext } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import { CardActions, Button, CardHeader, IconButton } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import CachedIcon from '@material-ui/icons/Cached'

import { FirebaseContext } from '../../firebase/firebaseContext'

import AppTable from '../common/AppTable'

const ScheduleCard = ({ schedule, index }) => {
  const scheduleRef = `schedules/${index}`
  const { app, dispatch } = useContext(FirebaseContext)

  const handleRefresh = () => {
    const slotsRef = app.database().ref('/slots')
    slotsRef
      .orderByChild('isOpen')
      .equalTo(true)
      .once('value', snapshot => {
        let slots = {}
        Object.entries(snapshot.val()).forEach(([key, value]) => {
          let { isOpen, ...newValue } = value
          newValue = { ...newValue, owner: '', status: 'Vacant', tenant: '' }
          slots[key] = newValue
        })
        dispatch({ type: 'refreshSchedule', payload: { slots, scheduleRef } })
      })
  }

  const handleDelete = () => {
    dispatch({ type: 'deleteSchedule', payload: scheduleRef })
  }

  const handleStartDateChange = date => {
    date = date.toISOString()
    dispatch({ type: 'editStartDate', payload: { date, scheduleRef } })
  }

  const handleEndDateChange = date => {
    date = date.toISOString()
    dispatch({ type: 'editEndDate', payload: { date, scheduleRef } })
  }

  return (
    <Grid item key={index} xs={12} sm={12} md={6}>
      <Card>
        <CardHeader
          action={
            <React.Fragment>
              <IconButton onClick={handleRefresh}>
                <CachedIcon></CachedIcon>
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </React.Fragment>
          }
        >
          <p>IN</p>
        </CardHeader>
        <CardContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start date"
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                value={schedule.startDate}
                onChange={handleStartDateChange}
              />

              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="End date"
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                value={schedule.endDate}
                onChange={handleEndDateChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <br />
          <AppTable
            title="Slots"
            data={schedule.slots}
            excludedHeaders={['isOpen']}
            actions={['edit', 'delete']}
            firebaseRef={`${scheduleRef}/slots`}
          ></AppTable>
        </CardContent>
        <CardActions>
          <Button>Randomize</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ScheduleCard
