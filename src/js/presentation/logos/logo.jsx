import React from 'react';
import SVGInline from 'react-svg-inline';

import { logoMark, logoType } from 'icons';

import 'styles/components/logo.scss';

console.log(logoMark)

const Logo = (props) => {
  return (
    <div className={ `Logo ${props.full ? 'Logo--full' : '' }` }>
      <SVGInline svg={ logoMark } description='Insert logo description.' title='Insert logo title.' />
      { props.full
        ? <SVGInline svg={ logoType } className='Logo-text' description='Insert logo description.' title='Insert logo title.' />
        : ''
      }
    </div>
  )
}

export default Logo;