import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LandingContainer from 'components/landing';
import LoginFormContainer from 'components/forms/login-form';
import NewUserFormContainer from 'components/forms/new-user-form';

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
