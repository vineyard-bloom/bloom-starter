import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ExampleFormContainer from 'components/forms/example-form'
import HomeContainer from 'components/home'
import LandingContainer from 'components/landing'

import ExampleAccordion from 'components/examples/presentation/example-accordion'

import FourOhFour from 'pages/four-oh-four.jsx'

const AuthenticatedRoutes = () => (
  <Switch>
    <Route exact path='/' component={LandingContainer} />
    <Route exact path='/example' component={ExampleFormContainer} />
    <Route path='/example/accordion' component={ExampleAccordion} />
    <Route path='/home' component={HomeContainer} />
    <Route path='/login' render={() => <Redirect to='/' />} />
    <Route path='/new' render={() => <Redirect to='/' />} />
    <Route path='*' component={FourOhFour} />
  </Switch>
)

export default AuthenticatedRoutes
