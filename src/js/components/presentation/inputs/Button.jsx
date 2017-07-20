import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'presentation/layout/loading';

import 'styles/components/buttons.scss';

const Button = (props) => {
  let { className, disabled, id, loading, onClick, text } = props;
  let classes = className && className.indexOf('btn') > -1 ? `o-flex-container ${className || ''}` : `o-flex-container btn ${className || ''}`;
  return (
   <button className={ classes } onClick={ onClick } id={ id } disabled={ disabled }>
    { loading ?
      <Loading /> : '' }
    { text }
   </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string
}

export default Button;