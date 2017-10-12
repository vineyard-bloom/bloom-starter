import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextInput } from 'bloom-forms';

const LoginForm = (props) => {
  let formData = props.formData || { username: null, password: null, 'twoFactorSecret': null };

  return (
    <form id='login-form' className='form login-form'>
      <h3 className='login-form__header'>Log In</h3>
      <TextInput placeholder='Enter Username (required)' id='username' name='username' label='Username'
        value={ formData.username ? formData.username.value : '' } onChange={ props.updateForm }
      />
      <TextInput placeholder='Enter Password (required)' id='password' name='password' label='Password'
        value={ formData.password ? formData.password.value : '' } onChange={ props.updateForm } isPassword
      />
      <TextInput placeholder='Enter 2FA Pin Code (required)' id='twoFactorSecret' name='twoFactorSecret' label='Two Factor Pin Code'
        value={ formData['twoFactorSecret'] ? formData['twoFactorSecret'].value : '' } onChange={ props.updateForm }
      />
      <Button onClick={ props.submitForm } text='Log in' className='btn-alt login-form__submit-button u-justify-center' />
      <Link to='/new' className='login-form__no-account'>I don't have an account</Link>
    </form>
  )
}

export default LoginForm;
