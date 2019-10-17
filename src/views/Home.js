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

const slots = [
  {
    title: 'Slot 1',
    status: 'Temporarily Occupied',
    tenant: 'John Smith'
  },
  {
    title: 'Slot 2',
    status: 'Occupied',
    tenant: 'John Smith'
  },
  {
    title: 'Slot 3',
    status: 'Vacant',
    tenant: 'John Smith'
  }
]

const Home = props => {
  const { match, history } = props
  const classes = useStyles()
  const { app } = useContext(FirebaseContext)
  const [slots, setSlots] = useState(null)

  const isPublic = match.path === '/home'
  const slotRef = app.database().ref('/slots')

  useEffect(() => {
    slotRef.orderByValue().on('value', snapshot => {
      setSlots(snapshot.val())
    })
  }, [])

  let list = []

  if (slots) {
    Object.entries(slots).forEach(([key, value]) => {
      list.push(
        <React.Fragment key={key}>
          <SlotList slot={value}></SlotList>
          <Divider variant="inset" component="li"></Divider>
        </React.Fragment>
      )
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppHeader isPublic={isPublic} history={history}></AppHeader>
      <Container maxWidth="md" component="main" className={classes.container}>
        <List className={classes.list}>
          {list.length > 0 ? list : <ListItem>No entries found...</ListItem>}
        </List>
      </Container>
    </React.Fragment>
  )
}

export default Home
