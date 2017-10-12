import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import { addAlert } from 'redux-store/actions/alertActions'
import { login } from 'redux-store/actions/userActions';
import LoginForm from 'presentation/forms/login-form';

class LoginFormContainer extends React.Component {

  rerouteAfterSubmit = () => {
    this.props.history.push('/'); 
  };

  submitForm = (formData, files, successCallback, failCallback) => {
    // WebService.post('/user/login', formData)
    //   .then((res) => {
    //     this.rerouteAfterSubmit(res, formData)
    //   })
    //   .catch((err) => {
    //     failCallback(err)
    //   })
    this.props.login(formData)
      .then((res) => {
        this.rerouteAfterSubmit()
      })
      .catch((err) => {
        this.props.addAlert(err)
        failCallback(err)
      })
  }

  render() {
    let fieldNames = ['username', 'password', 'twoFactorSecret'];

    return (
      <Form id='login-form' fieldNames={ fieldNames } submitForm={ this.submitForm }>
        <LoginForm />
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: (message, style='warning') => {
      dispatch(addAlert(`User Login Error: ${ message }`, style))
    },
    login: (user) => dispatch(login(user))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginFormContainer));
