import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeCashOfferRatio } from 'redux-store/actions';
import { humanFormatDateTime } from 'helpers';

import Lending from 'presentation/lending/lending';

class LendingContainer extends React.Component {

  state = {
    initialOffer: null
  };

  static propTypes = {
    changeCashOfferRatio: PropTypes.func,
    user: PropTypes.shape({
      avatar: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
      id: PropTypes.string,
      walletAddress: PropTypes.string,
      account: PropTypes.object,
      borrowingHistory: PropTypes.array,
      notifications: PropTypes.array,
      lendingHistory: PropTypes.array,
      lendingInfo: PropTypes.object
    })
  };

  changeCashOfferRatio = (e, submitToo = false) => {
    let val = e.target.value || parseFloat(0);
    let initialOffer = this.state.initialOffer;

    this.props.changeCashOfferRatio(val);

    if (submitToo) {
      if (initialOffer > val) {
        // the user is moving their money from queue to cash
        this.props.WebService.post('/transaction/transfer', { "amount": initialOffer - val })
      } else if (initialOffer < val) {
        // the user is moving their money to the queue
        this.props.WebService.post('/transaction/offer', { "amount": val - initialOffer })
      }
    }
  };

  componentWillReceiveProps = (newProps) => {
    if (!this.state.initialOffer) {
      this.setState({
        initialOffer: newProps.user.account.onOffer
      });
    }
  };

  componentDidMount = () => {
    this.setState({
      initialOffer: this.props.user.account.onOffer
    })
  };

  render() {
    let lendingHistory = this.props.user.lendingHistory || [];
    lendingHistory = lendingHistory.map((loan) => {
      loan.dateTime = loan.dateTime ? humanFormatDateTime(loan.dateTime) : '';
      return loan;
    });

    return <Lending lendingHistory={ this.props.user.lendingHistory || [] } headers={
      [
        { name: 'Loan ID', key: 'loanId' },
        { name: 'Date & Time of initial loan', key: 'dateTime' },
        { name: 'Amount Lent Out (in\u00A0ETH)', key: 'amount_eth' },
        { name: 'Amount Repaid (in\u00A0ETH)', key: 'repaid_eth' },
        { name: 'Effective Rate', key: 'effectiveRate' }
      ]
    } lendingInfo={ this.props.user.lendingInfo || {} } account={ this.props.user.account || {} }
      changeCashOfferRatio={ this.changeCashOfferRatio } />;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user ? state.user : {},
    WebService: state.services.WebService
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCashOfferRatio: (offerVal) => {
      dispatch(changeCashOfferRatio(offerVal));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LendingContainer);