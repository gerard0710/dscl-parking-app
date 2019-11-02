import React, { useContext, useState, useEffect } from 'react'

import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { FirebaseContext } from '../../firebase/firebaseContext'

function AppTableActions({ actions, id, tableTitle, firebaseRef }) {
  let autocomplete = []
  switch (tableTitle) {
    case 'Slots':
      autocomplete = ['owner', 'status', 'tenant']
      break

    default:
      break
  }
  const { dispatch } = useContext(FirebaseContext)

  const handleEdit = () => {
    dispatch({
      type: 'openEditDialog',
      payload: { fbRef: `${firebaseRef}`, autocomplete }
    })
  }

  const handleDelete = id => {
    switch (tableTitle) {
      case 'Parking Slots':
        dispatch({ type: 'deleteSlot', payload: { id } })
        break
      case 'Users':
        dispatch({ type: 'deleteUser', payload: { id } })
        break
      case 'Slots':
        dispatch({
          type: 'deleteScheduleSlot',
          payload: { fbRef: firebaseRef }
        })
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      {actions.map(action => {
        switch (action) {
          case 'edit':
            return (
              <IconButton key={`${action}-${id}`} onClick={() => handleEdit()}>
                <EditIcon></EditIcon>
              </IconButton>
            )
          case 'delete':
            return (
              <IconButton
                key={`${action}-${id}`}
                onClick={() => handleDelete(id)}
              >
                <DeleteIcon></DeleteIcon>
              </IconButton>
            )

          default:
            break
        }
      })}
    </React.Fragment>
  )
}

export default AppTableActions
