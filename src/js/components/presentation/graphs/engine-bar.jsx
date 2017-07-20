import React from 'react';

import 'styles/components/graph';

const EngineBar = (props) => {
  let { staticE, available, total, inE, outE } = props.data[0];

  return (
    <div className={ `graph--bar ${ props.sizeLarge ? 'graph--bar--large' : ''}` }>
      <div style={ { width: `${staticE / total * 100}%` } } className='graph--bar__section'>
        { !props.sizeLarge ?
          <div>
            <div>Available ETH:</div>
            <div>{ available } / { total }</div>
            <span className='u-sr-only'>not pending</span>
          </div>
          : '' }
      </div>
      <div style={ { width: `${outE / total * 100}%` } } className='graph--bar__section pending'>
        <span className='u-sr-only'>{ props.outE } ETH available and pending outgoing</span>
      </div>
      <div className='dividing-line' />
      <div style={ { width: `${inE / total * 100}%` } } className='graph--bar__section pending'>
        <span className='u-sr-only'>{ props.inE } ETH pending incoming</span>
      </div>
    </div>
  )
}

export default EngineBar;