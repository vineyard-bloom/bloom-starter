import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { humanFormatDate } from 'helpers';

import Borrowing from 'presentation/borrowing/borrowing';

class BorrowingContainer extends React.Component {
  state = {
    activeFilter: 'all',
    currLoanIndex: 0,
    currLoanId: ''
  };

  static propTypes = {
    account: PropTypes.shape({
      cash: PropTypes.string,
      debts: PropTypes.string,
      lent: PropTypes.string,
      offered: PropTypes.string,
      status: PropTypes.string
    }),
    borrowingHistory: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string,
          dateTime: PropTypes.number,
          totalAmount: PropTypes.number,
          paidBack: '',
          usd_val: '',
          interestRate: PropTypes.number,
        })
      ),
    borrowingInfo: PropTypes.object
  };

  switchFilter = (filterName) => {
    this.setState({
      activeFilter: filterName
    });
  };

  switchLoan = (prevOrNext) => {
    let loanId = '';
    let index = this.state.currLoanIndex;
    let loans = this.props.borrowingHistory.filter((transaction) => {
        return transaction.type.toLowerCase() === 'loan';
      });

    if (prevOrNext === 'next') {
      if (index === 0) {
        loanId = loans[loans.length-1].id;
        index = loans.length - 1;
      } else if (index === (loans.length - 1)) {
        loanId = loans[0].id;
        index = 0;
      } else {
        loanId = loans[index+1];
        index = index+1;
      }
    } else {
      if (index === 0) {
        loanId = loans[loans.length-1].id;
        index = loans.length-1;
      } else if (index === (loans.length - 1)) {
        loanId = loans[0].id;
        index = 0;
      } else {
        loanId = loans[index-1];
        index = index-1;
      }
    }
    

    this.setState({
      currLoanIndex: index,
      currLoanId: loanId
    });
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.borrowingHistory[0] && !this.state.currLoanId) {
      let loans = newProps.borrowingHistory.filter((transaction) => {
        return transaction.type.toLowerCase() === 'loan';
      });
      this.setState({
        currLoanId: loans && loans[0] ? loans[0].id : ''
      });
    }
  }

  componentDidMount = () => {
    let loans = this.props.borrowingHistory.filter((transaction) => {
        return transaction.type.toLowerCase() === 'loan';
      });

    this.setState({
      currLoanId: loans && loans[0] ? loans[0].id : '',
    });
  }

  render() {
    let borrowingHistory = this.props.borrowingHistory.map((loan) => {
      loan.dateTime = loan.created ? humanFormatDate(loan.created) : '';
      loan.type = 'loan';
      return loan;
    });
    
    return <Borrowing borrowingHistory={ this.props.borrowingHistory } headers={
      [
        { name: 'Transation Type', key: 'type' },
        { name: 'Date', key: 'dateTime' },
        { name: 'Amount (in\u00A0ETH)', key: 'totalAmount' },
        { name: 'Amount Repaid (in\u00A0ETH)', key: 'paidBack' },
        { name: 'Interest Rate', key: 'interestRate' }
      ]
    } borrowingInfo={ this.props.borrowingInfo } account={ this.props.account } activeFilter={ this.state.activeFilter }
      switchFilter={ this.switchFilter } currLoanId={ this.state.currLoanId } switchLoan={ this.switchLoan } />;
  }
}

const mapStateToProps = (state) => {
  return {
    borrowingHistory: state.user ? state.user.borrowingHistory : [],
    borrowingInfo: state.user ? state.user.borrowingInfo : {},
    account: state.user ? state.user.account : {}
  }
}

export default connect(mapStateToProps)(BorrowingContainer);
