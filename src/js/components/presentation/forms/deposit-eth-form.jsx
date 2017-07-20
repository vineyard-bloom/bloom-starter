import React from 'react';
import Clipboard from 'clipboard';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

import { humanFormatEth } from 'helpers';
import CurrencyInput from 'presentation/inputs/currency-input';
import Form from 'containers/form';

import 'styles/components/dw-form';

const DepositEthForm = (props) => {
  let clipboard = new Clipboard('#copy-button');
  let account = props.user.account;
  let debts = account.debts || 0;
  let assets = (account.cash || 0) + (account.lent || 0) + (account.offered || 0);

  let net = assets - debts;

  /* in case we add in form fields later (incomplete)
    <Form id='deposit-eth-form'>
        <h4>Enter Amount to Deposit (optional):</h4>
        <CurrencyInput currency='ETH' id='eth-deposit-input' />
        <CurrencyInput currency='USD' id='usd-deposit-input' />
      </Form>
  */

  return (
    <div className='dw-form'>
      <h3>Deposit ETH</h3>
      <div className='dw-address'>
        <h4>Wallet Address:</h4>
        <div id='wallet-address'>{ props.user.walletAddress }</div>
        <a href='#' data-clipboard-action='copy' data-clipboard-target='#wallet-address' id='copy-button'>
          copy address
        </a>
        <QRCode value={ props.user.walletAddress } />
      </div>
      <div className='dw-account-totals'>
        <div className='dw-account__box'>
          <h4>Capital</h4>
          <div>{ humanFormatEth(assets, 3) }</div>
        </div>
        <div className='dw-account__box'>
          <h4>Debt</h4>
          <div>{ humanFormatEth(debts, 3) }</div>
        </div>
        <div className='dw-account__box'>
          <h4>Net</h4>
          <div>{ humanFormatEth(net, 3) }</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DepositEthForm);