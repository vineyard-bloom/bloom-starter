import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LandingContainer from 'containers/landing-container';
import LoginFormContainer from 'containers/forms/login-form-container';
import NewUserFormContainer from 'containers/forms/new-user-form-container';

import FourOhFour from 'pages/four-oh-four.jsx';

const PublicRoutes = ({ user }) => (
  <Switch>
    <Route exact path='/' component={ LandingContainer } />
    <Route path='/login' component={ LoginFormContainer } />
    <Route path='/new' component={ NewUserFormContainer } />
    <Route path='*' render={ () => <Redirect to='/login' /> } />
  </Switch>
)

export default PublicRoutes
