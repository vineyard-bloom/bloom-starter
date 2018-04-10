import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form } from 'bloom-forms'

import { addAlert } from 'redux-store/actions/alert-actions'
import { createUser } from 'redux-store/actions/user-actions'

import NewUserForm from './presentation/new-user-form'

class NewUserFormContainer extends React.Component {
  state = {
    secret: ''
  }

  validationHelp = {
    errorLanguage: {
      'password-confirm': 'Passwords must match.',
      'two-factor-nonvalid': 'This should be a 6-digit code.',
      'two-factor-failed': 'This code is not valid.'
    },
    dictionary: {
      'confirm-password': testData =>
        testData === this.props.formState.password.value
          ? null
          : this.validationHelp.errorLanguage['password-confirm'],
      'two-factor': async testData => {
        const valid = testData.length && testData.length === 6
        if (!valid) {
          return this.validationHelp.errorLanguage['two-factor-nonvalid']
        }
        const success = await this.checkTwoFactorToken(
          this.state.secret,
          testData
        )
        return success
          ? null
          : this.validationHelp.errorLanguage['two-factor-failed']
      }
    }
  }

  rerouteAfterSubmit = res => {
    if (res.status === 200) {
      this.props.history.push('/')
    }
  }

  checkTwoFactorToken = async (twoFactorSecret, twoFactorToken) => {
    try {
      const success = await WebService.validateTwoFactorToken(
        twoFactorSecret,
        twoFactorToken
      )
      return success
    } catch (err) {
      this.props.addAlert(err)
    }
  }

  submitForm = async (formData, files, successCallback, failCallback) => {
    try {
      const res = await this.props.createUser(formData)
      this.rerouteAfterSubmit(res)
    } catch (err) {
      this.props.addAlert(err)
      failCallback(err)
    }
  }

  grabTwoFactor = async () => {
    try {
      const { data } = await WebService.fetchTwoFactorSecret()
      this.setState({
        secret: data.secret
      })
    } catch (err) {
      console.log('error fetching 2fa: ', err)
    }
  }

  componentDidMount() {
    this.grabTwoFactor()
  }

  render() {
    const fieldNames = [
      'username',
      'password',
      'confirmPassword',
      'twoFactorToken',
      'email',
      'withdrawAddress'
    ]

    return (
      <Form
        id='new-user-form'
        fieldNames={fieldNames}
        submitForm={this.submitForm}
        validationHelp={this.validationHelp}
        secret={this.state.secret}
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
const mapStateToProps = state => {
  return state.forms && state.forms.hasOwnProperty('new-user-form')
    ? { formState: state.forms['new-user-form'] }
    : {}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewUserFormContainer)
)
