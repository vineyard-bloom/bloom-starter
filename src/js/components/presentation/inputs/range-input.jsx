import React from 'react';

import 'styles/components/inputs';

const RangeInput = (props) => {
  let {
    className, formData, formErrors,
    id, label, placeholder,
    showLabel, validateAs, value, ...rest } = props;

  if (rest.required) {
    rest['aria-required'] = true;
  }

  return (
    <label className='input__label input__label--wrap'>
      { label }
      <input type='range' value={ props.value } name={ id } id={ id } onChange={ props.onChange } min='0' max={ props.total }
        className={ `input input--range ${ className ? className : '' } ${ formErrors && formErrors[id] ? 'input--invalid' : '' }` }
        data-validate={ validateAs }  placeholder={ placeholder } value={ value } step='0.01' onMouseOut={ props.onBlur } />
      { formErrors && formErrors[id] ?
        <div className='input__error'>{ formErrors[id] }</div>
      :
        '' }
    </label>
  )
}

export default RangeInput;