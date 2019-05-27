import React from 'react'
import { Route } from 'react-router-dom'
import HomePageContainer from './components/HomePageContainer.jsx';
import UsersPage from './pages/UsersPage.jsx'

export default () => (
  <div>
    <Route exact path='/' component={ HomePageContainer } />
    <Route path='/users' component={ UsersPage } />
  </div>
)
