import React from 'react';
import BigNumber from 'bignumber.js';

import { humanFormatEth } from 'helpers';
import 'styles/components/account-info-box';

const AccountInfoBox = (props) => {
  let { status, cash, lent, onOffer, debts } = props;
  let assets = new BigNumber(cash || 0).plus(new BigNumber(lent || 0)).plus(new BigNumber(onOffer || 0)).toString();
  let net = new BigNumber(assets).plus(new BigNumber(debts || 0)).toString();

  return (
    <div className='account-info-box'>
      <dl>
        <dt>Account Status
          <span className={ `account-info__status-bubble ${props.status ? props.status.toLowerCase() : ''}` }></span>
        </dt>
        <dd>{ status }</dd>
      
        <dt>Cash</dt>
        <dd>{ humanFormatEth(cash || parseFloat(0)) }</dd>

        <dt>Lent Out</dt>
        <dd>{ humanFormatEth(lent || parseFloat(0)) }</dd>

        <dt>On Offer</dt>
        <dd>{ humanFormatEth(onOffer || parseFloat(0)) }</dd>

      </dl>

      <dl>
        <dt>Assets</dt>
        <dd>{ humanFormatEth(assets || parseFloat(0)) }</dd>

        <dt>Debts</dt>
        <dd>{ humanFormatEth(debts || parseFloat(0)) }</dd>
      </dl>

      <dl>
        <dt>Net Capital</dt>
        <dd>{ humanFormatEth(net) }</dd>
      </dl>
    </div>
  )
}

export default AccountInfoBox;