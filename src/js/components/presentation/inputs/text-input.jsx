import React from 'react';
import PropTypes from 'prop-types';

import 'styles/components/inputs.scss';

const TextInput = (props) => {
  let {
    className, formData, formErrors,
    id, label, labelClass, placeholder,
    showLabel, validateAs, ...rest } = props;
  let labelTextClasses = `${ labelClass ? labelClass : '' } ${ showLabel ? '' : ' u-sr-only' }`;

  if (rest.required) {
    rest['aria-required'] = true;
  }

  return (
    <label className='input__label'>
      <span className={ labelTextClasses }>
        { label }
      </span>
      <input type='text' value={ props.value } name={ id } id={ id } onChange={ props.onChange }
        className={ `input input--text ${ className ? className : '' } ${ formErrors && formErrors[id] ? 'input--invalid' : '' }` }
        data-validate={ validateAs }  placeholder={ placeholder } />
      { formErrors && formErrors[id] ?
        <div className='input__error'>{ formErrors[id] }</div>
      :
        '' }
    </label>
  )
}

TextInput.propTypes = {
  className: PropTypes.string,
  formErrors: PropTypes.object,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  showLabel: PropTypes.bool,
  validateAs: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default TextInput;