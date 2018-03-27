import React from 'react'
import { Link } from 'react-router-dom'
import { Button, TextInput } from 'bloom-forms'

const LoginForm = props => {
  let formData = props.formData || {
    username: null,
    password: null,
    twoFactorSecret: null
  }

  return (
    <form id='login-form' className='Form AuthForm'>
      <h3 className='AuthForm-header'>Log In</h3>
      <TextInput
        placeholder='Enter Username (required)'
        id='username'
        name='username'
        label='Username'
        value={formData.username ? formData.username.value : ''}
        onChange={props.updateForm}
        validateAs='not-empty'
        error={
          formData.username && formData.username.error
            ? formData.username.error
            : ''
        }
      />
      <TextInput
        placeholder='Enter Password (required)'
        id='password'
        name='password'
        label='Password'
        value={formData.password ? formData.password.value : ''}
        onChange={props.updateForm}
        isPassword
        validateAs='not-empty'
        error={
          formData.password && formData.password.error
            ? formData.password.error
            : ''
        }
      />
      <TextInput
        placeholder='Enter 2FA Pin Code (required)'
        id='twoFactorSecret'
        name='twoFactorSecret'
        label='Two Factor Pin Code'
        value={
          formData['twoFactorSecret'] ? formData['twoFactorSecret'].value : ''
        }
        onChange={props.updateForm}
        validateAs='not-empty'
        error={
          formData.twoFactorSecret && formData.twoFactorSecret.error
            ? formData.twoFactorSecret.error
            : ''
        }
      />
      <Button
        onClick={props.submitForm}
        contents='Log in'
        className='Btn--alt AuthForm-submit-button u-justify-center'
      />
      <Link to='/new' className='AuthForm-no-account'>
        I don't have an account
      </Link>
    </form>
  )
}

export default LoginForm
