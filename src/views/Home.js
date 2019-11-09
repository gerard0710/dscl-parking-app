import React, { useState, useEffect, useContext } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

import { FirebaseContext } from '../firebase/firebaseContext'

import AppHeader from '../components/layout/AppHeader'
import SlotList from '../components/slots/SlotList'

import getSunday from '../utils/sundaySelector'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.grey[200]
    }
  },
  container: {
    marginTop: '10%'
  },
  list: {
    margin: 'auto',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

const Home = props => {
  const { match, history } = props
  const classes = useStyles()
  const { app } = useContext(FirebaseContext)
  const [slots, setSlots] = useState(null)
  const [scheduleKey, setScheduleKey] = useState()

  const isPublic = match.path === '/home'
  const scheduleRef = app.database().ref('/schedules')

  useEffect(() => {
    scheduleRef
      .orderByChild('startDate')
      .startAt(getSunday())
      .on('value', snapshot => {
        if (snapshot.val()) {
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            setSlots(value.slots)
            setScheduleKey(key)
          })
        }
      })
  }, [])

  const buildSlots = () => {
    let ui = <ListItem>No entries found...</ListItem>
    if (slots) {
      ui = []
      Object.entries(slots).forEach(([key, value]) => {
        ui.push(
          <React.Fragment key={key}>
            <SlotList
              slot={value}
              id={key}
              scheduleKey={scheduleKey}
            ></SlotList>
            <Divider variant="inset" component="li"></Divider>
          </React.Fragment>
        )
      })
    }

    return ui
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppHeader
        isPublic={isPublic}
        history={history}
        match={match}
      ></AppHeader>
      <Container maxWidth="md" component="main" className={classes.container}>
        <List className={classes.list}>{buildSlots()}</List>
      </Container>
    </React.Fragment>
  )
}

export default Home
