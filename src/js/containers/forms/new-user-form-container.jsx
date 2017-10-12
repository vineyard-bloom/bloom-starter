import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import { createUser } from 'redux-store/actions/userActions'

import NewUserForm from 'presentation/forms/new-user-form';

class NewUserFormContainer extends React.Component {

  rerouteAfterSubmit = (res, formData) => {
    this.props.history.push('/');
  };

  submitForm = (formData, files, successCallback, failCallback) => {
    this.props.createUser(formData)
      .then(res => this.rerouteAfterSubmit())
      .catch((err) => failCallback(err))
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