import React from 'react'
import PropTypes from 'prop-types'

import ErrorTip from 'presentation/layout/error-tip'

import 'styles/components/inputs.scss'

const TextInput = (props) => {
  let {
    className, error, isPassword,
    name, label, labelClass, placeholder,
    showLabel, validateAs, containerClass, ...rest } = props;
  let labelTextClasses = `input__label__text ${ labelClass ? labelClass : '' } ${ showLabel ? '' : ' u-sr-only' }`;

  let attr = {};

  if (rest.required) {
    attr['aria-required'] = true;
    attr.required = true;
  }

  return (
    <label className={ `input__label ${ containerClass || '' }` } htmlFor={ name } onBlur={ props.onBlur }>
      <span className={ labelTextClasses }>
        { label }{ attr.required && <span>{ '\u00A0' }*<span className="u-sr-only"> required field</span></span> }
      </span>
      <input type={ isPassword ? 'password' : 'text' } value={ props.value } name={ name } id={ name } onChange={ props.onChange }
        className={ `input input--text ${ className ? className : '' } ${ error ? 'input--invalid' : '' }` }
        data-validate={ validateAs }  placeholder={ placeholder } { ...attr } />
      { error ? <ErrorTip contents={ error } /> : '' }
    </label>
  )
}

TextInput.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  isPassword: PropTypes.bool,
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
  validateAs: PropTypes.string,
  value: PropTypes.string.isRequired
};

TextInput.defaultProps = {
  value: ''
}

export default TextInput;