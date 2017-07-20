import React from 'react';
import PropTypes from 'prop-types';

import { humanFormatEth } from 'helpers';

const BorrowingStatuses = (props) => {
  let { loans, debt } = props;

  let allLoans = loans.filter((transaction) => {
    return transaction.type.toLowerCase() === 'loan';
  });

  let loanTotal = allLoans.reduce((a,b) => {
    if (a['eth_val']) {
      a = a['eth_val'];
    }
    return new BigNumber(a).plus(new BigNumber(b['eth_val']));
  }, parseFloat(0));

  return (
    <div className='box lending-status'>
      <dl className='lending-status__row'>
        <dt>Currently Owe ({ allLoans.length } loans)</dt>
        <dd>{ humanFormatEth((debt || parseFloat(0)), 3) }</dd>
      </dl>
      <dl className='lending-status__row'>
        <dt>Next Autopayment Amount</dt>
        <dd>{ '' }</dd>
      </dl>
      <dl className='lending-status__row'>
        <dt>Lifetime Borrowed</dt>
        <dd>{ humanFormatEth(loanTotal, 3) }</dd>
      </dl>
      <dl className='lending-status__row'>
        <dt>Lifetime Repaid</dt>
        <dd>{ '' }</dd>
      </dl>
      <dl className='lending-status__row'>
        <dt>Lifetime Interest Paid</dt>
        <dd>{ '' }</dd>
      </dl>
    </div>
  );
}

BorrowingStatuses.propTypes = {
  debt: PropTypes.number,
  loans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string.isRequired,
      dateTime: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
      eth_val: PropTypes.number,
      usd_val: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
      btc_val: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
      interestRate: PropTypes.number,
      repaid: PropTypes.number
    })
  )
}

export default BorrowingStatuses;