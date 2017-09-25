import React from 'react';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import LoginForm from 'presentation/forms/login-form';

class LoginFormContainer extends React.Component {

  rerouteAfterSubmit = () => {
    this.props.history.push('/'); 
  };

  submitForm = (formData, files, successCallback, failCallback) => {
    this.props.WebService.post('/user/login', formData)
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

const mapStateToProps = (state) => {
  return {
    WebService: state.services.WebService
  }
}

export default withRouter(connect(mapStateToProps)(LoginFormContainer));
