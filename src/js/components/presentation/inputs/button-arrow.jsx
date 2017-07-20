import React from 'react';
import SVGInline from 'react-svg-inline';

import triangle from 'images/inline-svgs/triangle.svg';

const ButtonArrow = (props) => {
  return (
    <button className={ `btn--null btn--${ props.direction }` } onClick={ props.onClick }>
      <span className='u-sr-only'>
        { props.direction === 'left' ? 'previous' : 'next' }
      </span>
      <SVGInline svg={ triangle } />
    </button>
  )
};

export default ButtonArrow;