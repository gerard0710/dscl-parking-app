import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import config from './configs'

class Firebase {
  constructor() {
    app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.database()
  }

  getUiConfig = () => ({
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  })

  getAuth = () => firebase.auth()
  users = () => this.db.ref('users')
  user = uid => this.db.ref(`users/${uid}`)
}

export default Firebase
