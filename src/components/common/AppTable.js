import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

const AppTable = ({ title, data, withAction, actions }) => {
  const headings = Object.keys(data[0])

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

            {withAction && actions ? <TableCell>ACTION</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, index) => (
            <TableRow key={index}>
              {headings.map(heading => (
                <TableCell key={d[heading]}>{d[heading]}</TableCell>
              ))}
            </TableRow>
          ))}

          {/** TODO: Map through data and build table body

          <TableRow key={row.number}>
              <TableCell>{row.number}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.ownershipDate}</TableCell>
              <TableCell>{row.tenant}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditIcon></EditIcon>
                </IconButton>
                <IconButton>
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </TableCell>
            </TableRow>
        
        */}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default AppTable
