import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import NewUserForm from 'presentation/forms/new-user-form';

class NewUserFormContainer extends React.Component {

  rerouteAfterSubmit = (res, formData) => {
    WebService.post('/user/login', formData).then(() => {
      this.props.history.push('/lending');
    });
  };

  submitForm = (formData, files, successCallback, failCallback) => {
    WebService.post('/user', formData)
      .then((res) => {
        this.rerouteAfterSubmit(res, formData)
      })
      .catch((err) => {
        failCallback(err);
      })
  }

  render() {
    let fieldNames = ['username', 'password', 'twoFactorSecret', 'email', 'withdrawAddress'];

    return (
      <Form id='new-user-form' fieldNames={ fieldNames } submitForm={ this.submitForm }>
        <NewUserForm />
      </Form>
    );
  }
}

export default withRouter(NewUserFormContainer);