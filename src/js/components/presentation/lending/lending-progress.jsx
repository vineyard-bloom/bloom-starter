import React from 'react';

import { humanFormatEth } from 'helpers';

import 'styles/components/boxes';

const LendingProgress = (props) => {
  return (
    <div className='box lending-status'>
      <dl className='lending-status__row'>
        <dt>Lifetime Interest Earned</dt>
        <dd>{ props.lifetimeInterest ? humanFormatEth(props.lifetimeInterest, 3) : humanFormatEth(parseFloat(0)) }</dd>
      </dl>
      <dl className='lending-status__row'>
        <dt>Total In Default</dt>
        <dd>{ props.defaultedLoans ? humanFormatEth(props.defaultedLoans, 3) : humanFormatEth(parseFloat(0)) }</dd>
      </dl>
    </div>
  );
}

export default LendingProgress;
