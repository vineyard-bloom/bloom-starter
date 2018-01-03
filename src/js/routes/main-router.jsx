import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import AuthenticatedRoutes from './authenticated-routes'
import PublicRoutes from './public-routes'
import LandingContainer from 'components/landing'
import LoadingScreen from 'layout/loading-screen'

const MainRouter = ({ user, ...props }) => {
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
          ? <AuthenticatedRoutes user={ user } />
          : <PublicRoutes user={ user } />
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

export default withRouter(connect(mapStateToProps)(MainRouter));