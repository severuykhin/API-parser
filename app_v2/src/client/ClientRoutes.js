import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import UsersPage from './pages/UsersPage.jsx'

export default () => (
  <div>
    <Route exact path='/' component={ HomePage } />
    <Route path='/users' component={ UsersPage } />
  </div>
)
