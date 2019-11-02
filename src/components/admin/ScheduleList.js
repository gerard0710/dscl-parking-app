import React, { useContext, useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

import { FirebaseContext } from '../../firebase/firebaseContext'
import ScheduleCard from './ScheduleCard'
import AppPopup from '../common/AppPopup'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: 'none'
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  },
  container: {
    marginTop: theme.spacing(3)
  }
}))

const ScheduleList = () => {
  const classes = useStyles()
  const { app, state, dispatch } = useContext(FirebaseContext)

  const now = new Date()
  const end = new Date()

  end.setDate(end.getDate() + 5)
  const [startDate, setStartDate] = useState(now)
  const [endDate, setEndDate] = useState(end)

  const scheduleRef = app.database().ref('/schedules')
  const slotsRef = app.database().ref('/slots')

  useEffect(() => {
    scheduleRef.on('value', snapshot => {
      dispatch({ type: 'setSchedule', payload: { schedules: snapshot.val() } })
    })
  }, [])

  const handleSubmit = () => {
    const newKey = scheduleRef.push().key
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
        dispatch({
          type: 'addSchedule',
          payload: {
            newKey,
            scheduleDetails: { startDate, endDate, slots }
          }
        })
      })
  }

  const buildScheduleGrid = () => {
    let ui = []
    const { schedules } = state

    if (schedules) {
      Object.entries(schedules).forEach(([key, value]) => {
        ui.push(
          <ScheduleCard key={key} schedule={value} index={key}></ScheduleCard>
        )
      })
    } else {
      ui.push(
        <Typography key={'noschedulesFound'}>No entries found...</Typography>
      )
    }

    return ui
  }

  return (
    <React.Fragment>
      <AppPopup
        content={
          <Card className={classes.card}>
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
                    value={startDate}
                    onChange={date => setStartDate(date)}
                  />
                </Grid>

                <Grid container justify="space-around">
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
                    value={endDate}
                    onChange={date => setEndDate(date)}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={handleSubmit}>
                Send
              </Button>
            </CardActions>
          </Card>
        }
      ></AppPopup>
      <Container maxWidth="md" component="main" className={classes.container}>
        <Grid container spacing={2} alignItems="center" justify="center">
          {buildScheduleGrid()}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default ScheduleList
