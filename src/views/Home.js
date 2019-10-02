import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

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

const Home = ({ match }) => {
  const classes = useStyles()

  const isPublic = match.path === '/home'

  return (
    <React.Fragment>
      <CssBaseline />
      <AppHeader isPublic={isPublic}></AppHeader>
      <Container maxWidth="md" component="main" className={classes.container}>
        <List className={classes.list}>
          {slots.map(slot => (
            <React.Fragment>
              <SlotList slot={slot} key={slot.title}></SlotList>
              <Divider variant="inset" component="li"></Divider>
            </React.Fragment>
          ))}
        </List>
      </Container>
    </React.Fragment>
  )
}

export default Home
