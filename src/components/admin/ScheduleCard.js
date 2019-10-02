import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import StarIcon from '@material-ui/icons/StarBorder'
import EditIcon from '@material-ui/icons/Edit'

import Slots from './Slots'

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
  }
}))

const ScheduleCard = ({ schedule, index }) => {
  const classes = useStyles()
  return (
    <Grid item key={index} xs={12} sm={12} md={6}>
      <Card>
        <CardHeader
          subheader={schedule.date}
          action={<EditIcon></EditIcon>}
          className={classes.cardHeader}
        />
        <CardContent>
          <Slots></Slots>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Edit
          </Button>
          <Button variant="contained" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ScheduleCard
