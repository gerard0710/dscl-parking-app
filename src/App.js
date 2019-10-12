import React, { useContext } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import PrivateRoute from './auth'

import Admin from './views/Admin'
import Home from './views/Home'
import Login from './views/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login}></Route>
        <PrivateRoute path="/admin" component={Admin}></PrivateRoute>
        <PrivateRoute path="/home" component={Home}></PrivateRoute>
      </Router>
    </div>
  )
}

export default App
