import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'bloom-forms';

import ExampleForm from 'presentation/forms/example-form';

class ExampleFormContainer extends React.Component {

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
    let fieldNames = ['textinput', 'password', 'checkbox', 'radio', 'select', 'toggle', 'file-simple'];

    return (
      <Form id='example-form' fieldNames={ fieldNames } submitForm={ this.submitForm }>
        <ExampleForm />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    WebService: state.services.WebService
  }
}

export default withRouter(connect(mapStateToProps)(ExampleFormContainer));