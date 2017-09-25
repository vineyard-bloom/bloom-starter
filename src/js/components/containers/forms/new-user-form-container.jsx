import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import NewUserForm from 'presentation/forms/new-user-form';

class NewUserFormContainer extends React.Component {

  rerouteAfterSubmit = (res, formData) => {
    this.props.WebService.post('/user/login', formData).then(() => {
      this.props.history.push('/lending');
    });
  };

  submitForm = (formData, files, successCallback, failCallback) => {
    this.props.WebService.post('/user', formData)
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

const mapStateToProps = (state) => {
  return {
    WebService: state.services.WebService
  }
}

export default withRouter(connect(mapStateToProps)(NewUserFormContainer));