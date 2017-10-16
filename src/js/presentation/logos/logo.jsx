import React from 'react';
import SVGInline from "react-svg-inline";

import logoMark from 'images/inline-svgs/logo_mark.svg';
import logoType from 'images/inline-svgs/logo_type.svg';

import 'styles/components/logo.scss';

const Logo = (props) => {
  return (
    <div className={ `Logo ${props.full ? 'Logo--full' : '' }` }>
      <SVGInline svg={ logoMark } />
      { props.full ? <SVGInline svg={ logoType } className='Logo-text' /> : '' }
    </div>
  )
}

export default Logo;