import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import AuthenticatedRoutes from './authenticated-routes'
import PublicRoutes from './public-routes'
import LandingContainer from 'containers/landing-container'
import LoadingScreen from 'presentation/layout/loading-screen'

const MainSwitch = ({ user, ...props }) => {
  if (user && !user.loaded) {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={ LandingContainer } />
          <Route path='*' component={ LoadingScreen } />
        </Switch>
      </main>
    )
  } else {
    return (
      <main>
        { user && user.loaded && user.id
          ? <AuthenticatedRoutes />
          : <PublicRoutes />
        }
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user || {},
  }
}

export default withRouter(connect(mapStateToProps)(MainSwitch));