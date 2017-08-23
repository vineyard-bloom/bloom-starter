import React from 'react';
import PropTypes from 'prop-types';

import 'styles/components/inputs.scss';

const Checkbox = (props) => {
  let {
    checked, className, errors,
    name, label, labelClass, placeholder,
    showLabel, validateAs, ...rest } = props;
  let labelTextClasses = `input__label__text ${ labelClass ? labelClass : '' } ${ showLabel ? '' : ' u-sr-only' }`;

  if (rest.required) {
    attr['aria-required'] = true;
    attr.required = true;
  }

  return (
    <label className='input__label input__label--inline u-justify-center'>
      <span className={ labelTextClasses }>
        { label }{ attr.required && <span>{ '\u00A0' }*<span className="u-sr-only"> required field</span></span> }
      </span>
      <div className={ `input--checkbox__placeholder ${ checked ? 'is-checked' : '' }` }></div>
      <input type='checkbox' checked={ checked } name={ name } id={ name } onChange={ props.onChange }
        className={ `input input--text ${ className ? className : '' } ${ errors ? 'input--invalid' : '' }` }
        data-validate={ validateAs } { ...attr } />
      { errors &&
        <div className='input__error'>{ errors }</div>
      }
    </label>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  errors: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
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
  validateAs: PropTypes.string
};

export default Checkbox;