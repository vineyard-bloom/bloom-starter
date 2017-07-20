import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Form from 'containers/form';
import HomeContainer from 'containers/home-container';
import LoginFormContainer from 'containers/login-form-container';
import NewUserFormContainer from 'containers/new-user-form-container';

const MainSwitch = (props) => (
  <main className={ `${props.modalContents ? 'u-prevent-scroll' : ''} ${ props.location.pathname.indexOf('dashboard') > -1 ? 'u-no-margin' : '' }` }>
    <Switch>
      <Route exact path='/' render={ () => (
        props.user.username ?
          <Redirect to='/dashboard' />
        :
          <Redirect to='/login' />
        )} />
      <Route path='/dashboard' component={ HomeContainer } />
      <Route path='/lending' component={ HomeContainer } />
      <Route path='/borrowing' component={ HomeContainer } />
      <Route path='/login' component={ LoginFormContainer } />
      <Route path='/new' component={ NewUserFormContainer } />
      <Route path='/account' render={ () => {
        return <Redirect to='/login' />
      }} />
    </Switch>
  </main>
);

const mapStateToProps = (state) => {
  return {
    modalContents: state.modal.modalContents,
    user: state.user || {},
  }
}

export default withRouter(connect(mapStateToProps)(MainSwitch));