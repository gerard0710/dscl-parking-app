import React, { useContext, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import { FirebaseContext } from '../../firebase/firebaseContext'
import ScheduleCard from './ScheduleCard'
import { Typography } from '@material-ui/core'

const schedules = [
  {
    date: 'Oct 7 - Oct 11, 2019',
    tenants: [
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley'
    ]
  },
  {
    date: 'Oct 7 - Oct 11, 2019',
    tenants: [
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley'
    ]
  },
  {
    date: 'Oct 7 - Oct 11, 2019',
    tenants: [
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley'
    ]
  },
  {
    date: 'Oct 7 - Oct 11, 2019',
    tenants: [
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley',
      'Elvis Presley'
    ]
  }
]

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
  const scheduleRef = app.database().ref('/schedules')

  useEffect(() => {
    scheduleRef.on('value', snapshot => {
      dispatch({ type: 'setSchedule', payload: snapshot.val() })
    })
  }, [])

  const buildScheduleGrid = () => {
    let ui = <Typography>No entries found...</Typography>
    const { schedules } = state

    if (schedules) {
      Object.entries(schedules).forEach(([key, value]) => {
        ui.push(<ScheduleCard key={key} schedule={value}></ScheduleCard>)
      })
    }

    return ui
  }

  return (
    <Container maxWidth="md" component="main" className={classes.container}>
      <Grid container spacing={2} alignItems="center" justify="center">
        {buildScheduleGrid()}
      </Grid>
    </Container>
  )
}

export default ScheduleList
