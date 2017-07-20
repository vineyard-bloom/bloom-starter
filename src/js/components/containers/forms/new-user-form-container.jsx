import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Form from 'containers/forms/form';
import NewUserForm from 'presentation/forms/new-user-form';

class NewUserFormContainer extends React.Component {

  rerouteAfterSubmit = (res, formData) => {
    this.props.WebService.post('/user/login', formData).then(() => {
      this.props.history.push('/lending');
    });
  };

  render() {
    let fieldNames = ['username', 'password', 'twoFactorSecret', 'email', 'withdrawAddress'];

    return (
      <Form id='new-user-form' submitRoute='/user' fieldNames={ fieldNames }
        afterSubmit={ this.rerouteAfterSubmit }>
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