import React from 'react';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';

import { humanFormatEth } from 'helpers';

import CountDownTimer from 'presentation/count-down-timer';
import RangeInput from 'presentation/inputs/range-input';

import 'styles/components/boxes';

const LendingStatuses = (props) => {
  let { status, cash, lent, onOffer, debts } = props.account;
  let assets = new BigNumber(cash || 0).plus(new BigNumber(lent || 0)).plus(new BigNumber(onOffer || 0)).toString();

  let rangeLabel = (
    <div className='lending-status__row'>
      <dl>
        <dt>On Offer</dt>
        <dd>{ humanFormatEth(onOffer) }</dd>
      </dl>
      <dl className='u-align-right'>
        <dt>Cash</dt>
        <dd>{ humanFormatEth(cash) }</dd>
      </dl>
    </div>
  );

  return (
    <div className='box lending-status'>
      <dl className='lending-status__row'>
        <dt>Time Until Next Repayment</dt>
        <dd><CountDownTimer paddedTime={ true } /></dd>
      </dl>
      <dl className='lending-status__row'>
        <dt>Net Capital</dt>
        <dd>{ humanFormatEth(new BigNumber(assets).plus(new BigNumber(debts || 0))).toString() }</dd>
      </dl>
      <dl className='lending-status__row'>
        <dt>Lent Out</dt>
        <dd>{ humanFormatEth(lent || parseFloat(0)) }</dd>
      </dl>
      <RangeInput showLabel={ true } label={ rangeLabel } onChange={ props.changeCashOfferRatio }
        value={ new BigNumber(onOffer || 0).toString() } total={ new BigNumber(cash || 0).plus(new BigNumber(onOffer || 0)).toString() }
        onBlur={ (e) => { props.changeCashOfferRatio(e, true); } } />
    </div>
  );
}

export default LendingStatuses;