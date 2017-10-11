import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import LoginForm from 'presentation/forms/login-form';

class LoginFormContainer extends React.Component {

  rerouteAfterSubmit = () => {
    this.props.history.push('/'); 
  };

  submitForm = (formData, files, successCallback, failCallback) => {
    WebService.post('/user/login', formData)
      .then((res) => {
        this.rerouteAfterSubmit(res, formData)
      })
      .catch((err) => {
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

export default withRouter(LoginFormContainer);
