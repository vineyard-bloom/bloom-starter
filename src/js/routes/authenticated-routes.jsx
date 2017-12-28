import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ExampleFormContainer from 'containers/forms/example-form-container';
import HomeContainer from 'containers/home-container';
import LandingContainer from 'containers/landing-container'

import ExampleAccordion from 'presentation/examples/example-accordion'

import FourOhFour from 'pages/four-oh-four.jsx';

const AuthenticatedRoutes = ({ user }) => (
  <Switch>
    <Route exact path='/' component={ LandingContainer } />
    <Route exact path='/example' component={ ExampleFormContainer } />
    <Route path='/example/accordion' component={ ExampleAccordion } />
    <Route path='/home' component={ HomeContainer } />
    <Route path='/login' render={() => <Redirect to='/' />} />
    <Route path='/new' render={() => <Redirect to='/' />} />
    <Route path='*' component={ FourOhFour } />
  </Switch>
)

export default AuthenticatedRoutes
