import React from 'react';
import PropTypes from 'prop-types';

import 'styles/components/inputs.scss';

const SelectInput = (props) => {
  let { labelText, name, onChange, options, val } = props;
  let opts = options.map((opt, i) => {
    return <option key={ `${name}-opt-${i}` } value={ opt }>{ opt }</option>
  });
  return (
    <label htmlFor={ name }>
      { labelText }
      <select value={ val } name={ name } id={ name } className='c-input--select' onChange={ onChange }>
        { opts }
      </select>
    </label>
  )
}

SelectInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  showLabel: PropTypes.bool,
  val: PropTypes.string.isRequired
}

export default SelectInput;
