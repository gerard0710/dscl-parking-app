import React, { useContext } from 'react'

import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { FirebaseContext } from '../../firebase/firebaseContext'

function AppTableActions({ actions, id }) {
  const { dispatch } = useContext(FirebaseContext)

  return (
    <React.Fragment>
      {actions.map(action => {
        switch (action) {
          case 'edit':
            return (
              <IconButton
                key={`${action}-${id}`}
                onClick={() => dispatch({ type: 'deleteSlot', payload: id })}
              >
                <EditIcon></EditIcon>
              </IconButton>
            )
          case 'delete':
            return (
              <IconButton
                key={`${action}-${id}`}
                onClick={() => dispatch({ type: 'deleteSlot', payload: id })}
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
