import React, { useContext } from 'react'
import { Switch } from '@material-ui/core'
import { FirebaseContext } from '../../firebase/firebaseContext'

function AppTableSwitch(props) {
  const { tableTitle, cellHeading, cellValue, cellKey } = props
  const { app } = useContext(FirebaseContext)

  const handleChange = e => {
    let ref = ''
    let updates = {}
    switch (tableTitle) {
      case 'Parking Slots':
        ref = 'slots'
        break
      case 'Users':
        ref = 'users'
        break
      default:
        break
    }

    updates[`/${ref}/${cellKey}/${cellHeading}`] = e.target.checked
    app
      .database()
      .ref()
      .update(updates)
  }

  return (
    <Switch
      checked={cellValue}
      name={cellHeading}
      onChange={e => handleChange(e)}
    ></Switch>
  )
}

export default AppTableSwitch
