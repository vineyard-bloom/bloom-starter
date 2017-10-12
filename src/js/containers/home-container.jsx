import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BigNumber from 'bignumber.js';

import { convertWeiToEth } from 'helpers';
import { getUser } from 'redux-store/actions/userActions';
import { UserType } from 'types';

import SideBar from 'presentation/navigation/side-bar';

import 'styles/components/home';

class HomeContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    updateUser: PropTypes.func,
    user: PropTypes.shape(UserType)
  };

  mapDispatchToProps = (dispatch) => {
    return {
      getUser: () => {
        dispatch(updateUser());
      }
    }
  };

  mapStateToProps = (state) => {
    return {
      user: state.user
    }
  };

  componentWillReceiveProps = (newProps) => {
    if (!newProps.user.id && this.props.user.id) {
      // logged out
      this.props.history.push('/login');
    }
  };

  componentDidMount = () => {
    this.props.getUser()
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
