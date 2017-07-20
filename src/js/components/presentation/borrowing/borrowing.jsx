import React from 'react';
import PropTypes from 'prop-types';

import BorrowingStatuses from 'presentation/borrowing/borrowing-statuses';
import Button from 'presentation/inputs/button';
import LoanCarousel from 'presentation/borrowing/loan-carousel';
import Table from 'presentation/layout/table';

import 'styles/components/borrowing';

const Borrowing = (props) => {
  let activeHistory = props.borrowingHistory.filter((transaction) => {
    return props.activeFilter === 'all' || transaction.type.toLowerCase() === props.activeFilter;
  });

  let currLoan = props.borrowingHistory.filter((transaction) => {
    return transaction.id === props.currLoanId;
  })[0] || {};

  return (
    <div className='borrowing'>
      <LoanCarousel currLoan={ currLoan } switchLoan={ props.switchLoan } />

      <BorrowingStatuses debt={ Math.abs(props.account.debts || 0) } loans={ props.borrowingHistory } />

      <div className='borrowing__table'>
        <div className='borrowing__header-row'>
          <h3 className='borrowing__header'>Borrowing History</h3>
          <div className='borrowing__header-buttons'>
            <Button className={ `btn-alt btn--small ${ props.activeFilter === 'all' ? 'is-active' : '' }` } text='All'
              onClick={ () => { props.switchFilter('all') } } />
            <Button className={ `btn-alt btn--small ${ props.activeFilter === 'loan' ? 'is-active' : ''}` } text='Loans'
              onClick={ () => { props.switchFilter('loan') } } />
            <Button className={ `btn-alt btn--small ${ props.activeFilter === 'repayment' ? 'is-active' : ''}` } text='Repayments'
              onClick={ () => { props.switchFilter('repayment') } } />
          </div>
        </div>
        <Table data={ activeHistory } headers={ props.headers } />
      </div>
    </div>
  )
};

Borrowing.propTypes = {
  activeFilter: PropTypes.string,
  account: PropTypes.shape({
    cash: PropTypes.string,
    debts: PropTypes.string,
    lent: PropTypes.string,
    offered: PropTypes.string,
    status: PropTypes.string
  }),
  borrowingHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string.isRequired,
      dateTime: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
      eth_val: PropTypes.string,
      usd_val: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
      btc_val: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
      interestRate: PropTypes.number,
      repaid: PropTypes.string
    })
  ),
  switchFilter: PropTypes.func
}

export default Borrowing;