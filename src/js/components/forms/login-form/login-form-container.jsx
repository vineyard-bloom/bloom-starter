import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form } from 'bloom-forms'

import { addAlert } from 'redux-store/actions/alertActions'
import { login } from 'redux-store/actions/userActions'
import LoginForm from './presentation/login-form'

class LoginFormContainer extends React.Component {
  rerouteAfterSubmit = () => {
    this.props.history.push('/')
  };

  submitForm = async (formData, files, successCallback, failCallback) => {
    try {
      const res = await this.props.login(formData)
      this.rerouteAfterSubmit(res)
    } catch (err) {
      this.props.addAlert(err)
      failCallback(err)
    }
  };

  render() {
    const fieldNames = ['username', 'password', 'twoFactorSecret']

    return (
      <Form
        id='login-form'
        fieldNames={fieldNames}
        submitForm={this.submitForm}
      >
        <LoginForm />
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (message, style = 'warning') =>
      dispatch(addAlert(message, style)),
    login: user => dispatch(login(user))
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(LoginFormContainer)
)
