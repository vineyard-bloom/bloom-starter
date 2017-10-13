import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import { createUser } from 'redux-store/actions/userActions'

import ExampleForm from 'presentation/forms/example-form';

class ExampleFormContainer extends React.Component {

  rerouteAfterSubmit = (res, formData) => {
    this.props.history.push('/lending');
  };

  submitForm = (formData, files, successCallback, failCallback) => {
    console.log(formData, files ? Array.from(files.entries()) : 'no files')
    this.props.createUser(formData)
      .then(res => this.rerouteAfterSubmit())
  }

  render() {
    let fieldNames = ['textinput', 'password', 'checkbox', 'radio', 'select', 'toggle', 'file-simple', 'file-simple-2', 'file-droppable'];

    return (
      <Form id='example-form' fieldNames={ fieldNames } submitForm={ this.submitForm }>
        <ExampleForm />
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (userData) =>
      dispatch(createUser(userData))
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user || {}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExampleFormContainer));
