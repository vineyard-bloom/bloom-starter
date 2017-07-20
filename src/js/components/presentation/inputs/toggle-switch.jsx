import React from 'react';
import PropTypes from 'prop-types';

import 'styles/inputs.css';

const ToggleSwitch = (props) => {
  let { className, disabled, name, isActive, labelText, onClick } = props;

  return (
    <label className={ `toggle-switch ${ isActive ? 'active' : '' } ${ disabled ? 'disabled' : '' }
      ${ className || '' }` } onClick={ !disabled ? onClick : () => '' }>
      { labelText }
      <input type="checkbox" className="toggle-switch-input" checked={ isActive } id={ name } name={ name } />
      <div>
        <span className='sr-only'>{ isActive ? 'on' : 'off' }</span>
        <span className="toggle-switch-label" data-on="On" data-off="Off"></span>
        <span className={ `toggle-switch-handle ${ isActive ? 'active' : '' }` }></span>
      </div>
    </label>
  )
}

ToggleSwitch.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ToggleSwitch;