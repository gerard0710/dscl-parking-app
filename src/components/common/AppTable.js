import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import AppTableActions from './AppTableActions'
import AppTableSwitch from './AppTableSwitch'
import { Switch } from '@material-ui/core'

const AppTable = props => {
  const { title, data, actions, booleanSwitch } = props

  let headings = []
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
    headings = Object.keys(sample)

    Object.entries(data).forEach(([key, value]) => {
      let row = (
        <TableRow key={key}>
          {headings.map(heading => (
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

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headings.map(heading => (
              <TableCell key={heading}>{formatHeadings(heading)}</TableCell>
            ))}
            {actions ? (
              <TableCell>{formatHeadings('Actions')}</TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>{list}</TableBody>
      </Table>
    </React.Fragment>
  )
}

export default AppTable
