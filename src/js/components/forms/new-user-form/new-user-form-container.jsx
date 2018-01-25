import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form } from 'bloom-forms'

import { addAlert } from 'redux-store/actions/alertActions'
import { createUser } from 'redux-store/actions/userActions'

import NewUserForm from './presentation/new-user-form'

class NewUserFormContainer extends React.Component {
  rerouteAfterSubmit = res => {
    if (res.status === 200) {
      this.props.history.push('/')
    }
  };

  submitForm = async (formData, files, successCallback, failCallback) => {
    try {
      const res = await this.props.createUser(formData)
      this.rerouteAfterSubmit(res)
    } catch (err) {
      this.props.addAlert(err)
      failCallback(err)
    }
  };

  render() {
    const fieldNames = [
      'username',
      'password',
      'twoFactorSecret',
      'email',
      'withdrawAddress'
    ]

    return (
      <Form
        id='new-user-form'
        fieldNames={fieldNames}
        submitForm={this.submitForm}
      >
        <NewUserForm />
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (message, style = 'warning') =>
      dispatch(addAlert(message, style)),
    createUser: userData => dispatch(createUser(userData))
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(NewUserFormContainer)
)
