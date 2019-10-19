import React, { useContext } from 'react'

import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { FirebaseContext } from '../../firebase/firebaseContext'

function AppTableActions({ actions, id, tableTitle }) {
  const { dispatch } = useContext(FirebaseContext)

  const handleEdit = () => {
    switch (tableTitle) {
      case 'Parking Slots':
        dispatch({ type: 'editSlot', payload: '' })
        break
      case 'Users':
        dispatch({ type: 'editUser', payload: '' })
        break
      default:
        break
    }
  }

  const handleDelete = id => {
    switch (tableTitle) {
      case 'Parking Slots':
        dispatch({ type: 'deleteSlot', payload: id })
        break
      case 'Users':
        dispatch({ type: 'deleteUser', payload: id })
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
              <IconButton key={`${action}-${id}`} onClick={handleEdit}>
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

/**
 * {actions.map(action => {
              switch (action) {
                case 'edit':
                  return (
                    <IconButton>
                      <EditIcon></EditIcon>
                    </IconButton>
                  )
                case 'delete':
                  return (
                    <IconButton onClick={}>
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  )
                default:
                  break
              }
            })}
 */
