import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, RadioGroup, TextInput, ToggleSwitch } from 'bloom-forms';

const ExampleForm = (props) => {
  // I am a reference form
  const formData = props.formData || { textinput: null, password: null, checkbox: null, radio: null, toggle: null };
  const radioOptions = [
    { label: 'Radio 1', id: 'radio-1' },
    { label: 'Radio 2', id: 'radio-2' },
    { label: 'Radio 3', id: 'radio-3' }
  ]

  const toggleClick = (e) => {
    e.preventDefault();
    props.manualFieldUpdate(props.formId, 'toggle', formData && formData.toggle && !formData.toggle.value)
  }

  return (
    <form id='login-form' className='form login-form'>
      <h3 className='login-form__header'>Example Form</h3>
      <TextInput id='textinput' name='textinput' label='Text Input' showLabel
        value={ formData.textinput ? formData.textinput.value : '' } onChange={ props.updateForm }
      />
      <TextInput id='password' name='password' label='Password' showLabel isPassword
        value={ formData.password ? formData.password.value : '' } onChange={ props.updateForm }
      />
      <Checkbox label='Checkbox' checked={ formData.checkbox && formData.checkbox.value || '' }
        id='checkbox' name='checkbox' onChange={ props.updateForm } showLabel
      />
      <RadioGroup options={ radioOptions } onChange={ props.updateForm } name='radio'
        value={ formData.radio ? formData.radio.value : '' }
      />
      <ToggleSwitch labelText='Toggle Switch' isActive={ formData.toggle ? formData.toggle.value : false }
        name='toggle' onClick={ toggleClick }
      />
      <Button onClick={ props.submitForm } text='Log in' className='btn-alt login-form__submit-button u-justify-center' />
      <Link to='/new' className='login-form__no-account'>I don't have an account</Link>
    </form>
  )
}

export default ExampleForm;