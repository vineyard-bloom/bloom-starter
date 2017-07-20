import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BigNumber from 'bignumber.js';

import { convertWeiToEth } from 'helpers';
import { updateAccountStatus, updateUser } from 'redux-store/actions';

import BorrowingContainer from 'containers/borrowing-container';
import LendingContainer from 'containers/lending-container';
import SideBar from 'presentation/navigation/side-bar';

import 'styles/components/home';

class HomeContainer extends React.Component {
  static propTypes = {
    updateAccountStatus: PropTypes.func,
    updateUser: PropTypes.func,
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
    }),
    WebService: PropTypes.shape({
      get: PropTypes.func,
      post: PropTypes.func,
      getUser: PropTypes.func,
      login: PropTypes.func,
      register: PropTypes.func,
      updateUserPassword: PropTypes.func,
      fetchTwoFactorCode: PropTypes.func,
      validateTwoFactorToken: PropTypes.func,
      fetchExchangeRate: PropTypes.func,
      fetchGlobalTotals: PropTypes.func
    })
  };

  static mapDispatchToProps = (dispatch) => {
    return {
      updateAccountStatus: (userId, accountInfo) => {
        dispatch(updateAccountStatus(userId, accountInfo));
      },
      updateUser: (userId, userData) => {
        dispatch(updateUser(userId, userData));
      }
    }
  };

  static mapStateToProps = (state) => {
    return {
      countdown: state.engineState ? state.engineState.countdown : 0,
      user: state.user,
      WebService: state.services.WebService
    }
  };

  updateAccount = () => {
    this.props.WebService.get('/user/account')
      .then((res) => {
        let account = res.data;

        this.props.updateAccountStatus(this.props.user.id, account);
      });
  };

  componentWillReceiveProps = (newProps) => {
    if (!newProps.user.id && this.props.user.id) {
      // logged out
      this.props.history.push('/account/login');
    }

    if (newProps.countdown < 1000) {
      this.updateAccount();
    }
  };

  componentDidMount = () => {
    this.props.WebService.getUser()
      .then((res) => {
        if (this.props.user.id) {
          // we already have the user; just update account status
          let data = res.data.account;
          for (let field in data) {
            if (field.indexOf('total') > -1 || (field.indexOf('cash') > -1) || (field.indexOf('lentOut') > -1) || (field.indexOf('onOffer') > -1) || (field.indexOf('amount') > -1) || (field.indexOf('eth') > -1) || (field.indexOf('available') > -1)) {
              data[field] = convertWeiToEth(new BigNumber(data[field])).toString();
            }
          }
          this.props.updateAccountStatus(res.data.id, data);
        } else {
          let data = res.data;
          for (let key in data) {
            for (let field in data[key]) {
              if (field.indexOf('total') > -1 || (field.indexOf('cash') > -1) || (field.indexOf('lentOut') > -1) || (field.indexOf('onOffer') > -1) || (field.indexOf('amount') > -1) || (field.indexOf('eth') > -1) || (field.indexOf('available') > -1)) {
                data[key][field] = convertWeiToEth(new BigNumber(data[key][field])).toString();
              }
            }
          }
          this.props.updateUser(res.data.id, data);
        }
      });
  };

  render() {
    // console.log(`countdown: ${this.props.countdown}`)

    return (
      <div className='home'>
        <SideBar user={ this.props.user } />
        <div className='home-content'>
          { this.props.location.pathname.indexOf('lending') > -1 ?
            <LendingContainer />
            : '' }
          { this.props.location.pathname.indexOf('borrowing') > -1 ?
            <BorrowingContainer />
            : '' }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(HomeContainer.mapStateToProps, HomeContainer.mapDispatchToProps)(HomeContainer));