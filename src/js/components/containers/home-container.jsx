import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BigNumber from 'bignumber.js';

import { convertWeiToEth } from 'helpers';
import { updateUser } from 'redux-store/actions/userActions';

import SideBar from 'presentation/navigation/side-bar';

import 'styles/components/home';

class HomeContainer extends React.Component {
  static propTypes = {
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
      updateUser: (userId, userData) => {
        dispatch(updateUser(userId, userData));
      }
    }
  };

  static mapStateToProps = (state) => {
    return {
      user: state.user,
      WebService: state.services.WebService
    }
  };

  componentWillReceiveProps = (newProps) => {
    if (!newProps.user.id && this.props.user.id) {
      // logged out
      this.props.history.push('/login');
    }
  };

  componentDidMount = () => {
    // grab the user from api
    this.props.WebService.getUser()
      .then((res) => {
        let data = res.data;
        // update the user in the redux store
        this.props.updateUser(res.data.id, data);
      });
  };

  render() {
    return (
      <div className='home'>
        <SideBar user={ this.props.user } />
        <div className='home-content'>
          Main Content Here
        </div>
      </div>
    );
  }
}

export default withRouter(connect(HomeContainer.mapStateToProps, HomeContainer.mapDispatchToProps)(HomeContainer));
