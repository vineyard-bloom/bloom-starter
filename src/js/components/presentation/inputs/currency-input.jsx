import React from 'react';
import PropTypes from 'prop-types';

import 'styles/components/inputs';

const CurrencyInput = (props) => {
  let {
    className, currency, formData, formErrors,
    id, label, labelClass, name, onBlur, onChange, placeholder,
    showLabel, validateAs, value, ...rest } = props;
  let labelTextClasses = `input__label__text ${ labelClass ? labelClass : '' } ${ showLabel ? '' : ' u-sr-only' }`;

  let attr = {};

  if (rest.required) {
    attr['aria-required'] = true;
    attr.required = true;
  }

  let afterPosition = document.getElementById(`${id}__label`) ?
    document.getElementById(`${id}__label`).getBoundingClientRect().left + 10
    : null;

  // on label directly: input__label--small when presented side-by-side; for later

  return (
    <div>
      <label className='input__label' id={ `${id}__label` }>
        <span className={ labelTextClasses }>
          { label }{ attr.required && <span>{ '\u00A0' }*<span className="u-sr-only"> required field</span></span> }
        </span>
        <input type='number' min='0' step='any' value={ value } name={ name } id={ id } onChange={ onChange } onBlur={ onBlur }
          className={ `input input--currency ${ className ? className : '' } ${ formErrors ? 'input--invalid' : '' }` }
          data-validate='number' placeholder={ placeholder } { ...attr } />
        { afterPosition ?
          <div className='input__after' style={ { right: afterPosition } }>{ currency }</div>
          : '' }
      </label>
      { formErrors ?
          <div className='input__error'>{ formErrors }</div>
        :
          '' }
    </div>
  )
}

CurrencyInput.propTypes = {
  className: PropTypes.string,
  formErrors: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  showLabel: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
  ])
};

export default CurrencyInput;