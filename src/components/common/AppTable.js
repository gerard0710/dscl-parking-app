import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

import { FirebaseContext } from '../../firebase/firebaseContext'

import AppTableActions from './AppTableActions'
import AppTableSwitch from './AppTableSwitch'
import AppForm from './AppForm'
import { CardActions, Button } from '@material-ui/core'

const AppTable = props => {
  const {
    title,
    data,
    actions,
    booleanSwitch,
    excludedHeaders,
    firebaseRef
  } = props
  const { state, dispatch } = useContext(FirebaseContext)

  let displayHeadings = []
  let list = []

  const buildDisplay = (cellData, cellHeading, cellKey) => {
    if (typeof cellData === 'boolean') {
      if (booleanSwitch) {
        return (
          <AppTableSwitch
            tableTitle={title}
            cellHeading={cellHeading}
            cellValue={cellData}
            cellKey={cellKey}
          ></AppTableSwitch>
        )
      }
      return cellData ? 'Yes' : 'No'
    } else {
      return cellData
    }
  }

  if (data) {
    const sample = data[Object.keys(data)[0]]
    displayHeadings = Object.keys(sample)

    if (excludedHeaders) {
      displayHeadings = displayHeadings.filter(heading => {
        if (!excludedHeaders.includes(heading)) return heading
      })
    }

    Object.entries(data).forEach(([key, value]) => {
      let row = (
        <TableRow key={key}>
          {displayHeadings.map(heading => (
            <TableCell key={`${key}-${heading}`}>
              {buildDisplay(value[heading], heading, key)}
            </TableCell>
          ))}
          {actions ? (
            <TableCell>
              <AppTableActions
                actions={actions}
                id={key}
                tableTitle={title}
                firebaseRef={`${firebaseRef}/${key}`}
              ></AppTableActions>
            </TableCell>
          ) : null}
        </TableRow>
      )
      list.push(row)
    })
  }

  const formatHeadings = heading => {
    const separatedString = heading.replace(/([A-Z])/g, ' $1')
    return separatedString.toUpperCase()
  }

  const buildTableHeaders = () => {
    return displayHeadings.map(heading => (
      <TableCell key={heading}>{formatHeadings(heading)}</TableCell>
    ))
  }

  const handleClose = () => {
    dispatch({ type: 'closeEditDialog' })
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {buildTableHeaders()}
            {actions ? (
              <TableCell>{formatHeadings('Actions')}</TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>{list}</TableBody>
      </Table>

      <Dialog open={state.isDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        {state.isDialogOpen ? <AppForm></AppForm> : null}
      </Dialog>
    </React.Fragment>
  )
}

export default AppTable
