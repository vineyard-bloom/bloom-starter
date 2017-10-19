import React from 'react';
import SVGInline from 'react-svg-inline';

import { logoMark, logoType } from 'icons';

import 'styles/components/logo.scss';

const Logo = (props) => {
  return (
    <div className={ `Logo ${props.full ? 'Logo--full' : '' }` }>
      <SVGInline svg={ logoMark } />
      { props.full
        ? <SVGInline svg={ logoType } className='Logo-text' title='Loading' description='This section is loading.' />
        : ''
      }
    </div>
  )
}

export default Logo;