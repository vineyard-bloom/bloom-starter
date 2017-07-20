import React from 'react';
import { withRouter } from 'react-router';

import Form from 'containers/form';
import LoginForm from 'presentation/forms/login-form';

class LoginFormContainer extends React.Component {

  rerouteAfterSubmit = () => {
    this.props.history.push('/lending'); 
  };

  render() {
    let fieldNames = ['username', 'password', 'twoFactorSecret'];

    return (
      <Form id='login-form' submitRoute='/user/login' fieldNames={ fieldNames }
        afterSubmit={ this.rerouteAfterSubmit }>
        <LoginForm />
      </Form>
    );
  }
}

export default withRouter(LoginFormContainer);
