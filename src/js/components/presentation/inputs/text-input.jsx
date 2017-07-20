import React from 'react';
import PropTypes from 'prop-types';

import 'styles/components/inputs.scss';

const TextInput = (props) => {
  let {
    className, errors,
    name, label, labelClass, placeholder,
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
      <input type='text' value={ props.value } name={ name } id={ name } onChange={ props.onChange }
        className={ `input input--text ${ className ? className : '' } ${ errors ? 'input--invalid' : '' }` }
        data-validate={ validateAs }  placeholder={ placeholder } />
      { errors ?
        <div className='input__error'>{ errors }</div>
      :
        '' }
    </label>
  )
}

TextInput.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfTypes([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
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