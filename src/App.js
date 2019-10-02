import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Admin from './views/Admin'
import Home from './views/Home'
import Login from './views/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/home" component={Home}></Route>
      </Router>
    </div>
  )
}

export default App
