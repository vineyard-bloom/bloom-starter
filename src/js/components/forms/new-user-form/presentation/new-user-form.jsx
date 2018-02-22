import React from 'react'

import { Button, TextInput } from 'bloom-forms'

class NewUserForm extends React.Component {
  state = {
    stage: 0
  };

  toggleStage = e => {
    e.preventDefault()

    this.setState({
      stage: this.state.stage ? 0 : 1
    })
  };

  render() {
    let props = this.props
    let formData = props.formData || {
      username: null,
      email: null,
      password: null,
      twoFactorSecret: null,
      withdrawAddress: null
    }
    let allowContinue =
      formData.username &&
      formData.password &&
      formData.twoFactorSecret &&
      formData.username.value &&
      formData.password.value &&
      formData.twoFactorSecret.value

    return (
      <form className='Form AuthForm' id='new-user-form'>
        {this.state.stage == 0 ? (
          <div>
            <h3 className='AuthForm-header'>Create an account</h3>
            <TextInput
              placeholder='Enter Username (required)'
              id='username'
              name='username'
              label='Username'
              value={formData.username ? formData.username.value : ''}
              onChange={props.updateForm}
            />
            <TextInput
              placeholder='Create a Password (required)'
              id='password'
              name='password'
              label='Password'
              value={formData.password ? formData.password.value : ''}
              onChange={props.updateForm}
            />
            <TextInput
              placeholder='Enter Email (required)'
              id='email'
              name='email'
              label='Email'
              value={formData.email ? formData.email.value : ''}
              onChange={props.updateForm}
              validateAs='email'
            />
            <TextInput
              placeholder='Enter 2FA Pin Code (required)'
              id='twoFactorSecret'
              name='twoFactorSecret'
              label='Two Factor Pin Code'
              value={
                formData['twoFactorSecret']
                  ? formData['twoFactorSecret'].value
                  : ''
              }
              onChange={props.updateForm}
            />
            <Button
              onClick={this.toggleStage}
              text='Continue'
              className='Btn--alt AuthForm-submit-button u-justify-center'
              disabled={!allowContinue}
            />
          </div>
        ) : (
          <div>
            <a href='#' onClick={this.toggleStage} className='AuthForm-back'>
              Back
            </a>
            <p className='AuthForm-description'>
              Enter an Ethereum Wallet Address to Continue:
            </p>
            <TextInput
              placeholder='ETH Address'
              id='withdrawAddress'
              name='withdrawAddress'
              label='Ethereum Address'
              value={
                formData['withdrawAddress']
                  ? formData['withdrawAddress'].value
                  : ''
              }
              onChange={props.updateForm}
            />
            <p className='AuthForm-description'>
              In order to complete your account, you must enter a locked
              Ethereum wallet address. This address will be used for withdraws
              from the engine and can only be changed by a submitted reques
            </p>
            <Button
              onClick={props.submitForm}
              text='Complete Registration'
              className='Btn--alt AuthForm-submit-button u-justify-center'
            />
          </div>
        )}
      </form>
    )
  }
}

export default NewUserForm
