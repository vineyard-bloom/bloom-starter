import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, RadioGroup, SelectInput, TextInput, ToggleSwitch } from 'bloom-forms';

const ExampleForm = (props) => {
  // I am a reference form
  const formData = props.formData || { textinput: null, password: null, checkbox: null, radio: null, select: null, toggle: null };
  const radioOptions = [
    { label: 'Radio 1', id: 'radio-1' },
    { label: 'Radio 2', id: 'radio-2' },
    { label: 'Radio 3', id: 'radio-3' }
  ]
  const selectOptions = [
    { label: 'Muffins', value: 'muffins' },
    { label: 'Cookies', value: 'cookies' },
    { label: 'Cakes', value: 'birthday cakes' }
  ]

  const toggleClick = (e) => {
    e.preventDefault();
    props.manualFieldUpdate(props.formId, 'toggle', formData && formData.toggle && !formData.toggle.value)
  }

  return (
    <form id='example-form' className='form login-form'>
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
      <div style={{ zIndex: 5 }}>
        <SelectInput options={ selectOptions } name='select' formId='example-form'
          value={ formData.select && formData.select.value ? formData.select.value : '' }
          onChange={ props.manualFieldUpdate } showLabel label='Baked Goods'
          error={ formData.select && formData.select.error ? formData.select.error : '' }
        />
      </div>
      <div style={{ zIndex: 4 }}>
        <SelectInput options={ selectOptions } name='select' formId='example-form' typeAhead={ false }
          value={ formData.select && formData.select.value ? formData.select.value : '' }
          onChange={ props.manualFieldUpdate } showLabel label='Baked Goods -- No TypeAhead'
          error={ formData.select && formData.select.error ? formData.select.error : '' }
        />
      </div>
      <div style={{ zIndex: 3 }}>
        <ToggleSwitch labelText='Toggle Switch' isActive={ formData.toggle ? formData.toggle.value : false }
          name='toggle' onClick={ toggleClick }
        />
      </div>
      <Button onClick={ props.submitForm } text='Log in' className='btn login-form__submit-button u-justify-center' />
    </form>
  )
}

export default ExampleForm;