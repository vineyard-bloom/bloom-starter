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
    getUser: PropTypes.func,
    user: PropTypes.shape(UserType)
  };

  componentWillReceiveProps = (newProps) => {
    if (!newProps.user.id && this.props.user.id) {
      // logged out
      this.props.history.push('/login');
    }

    if (newProps.getUser && !this.props.getUser) {
      try {
        newProps.getUser()
      } catch(err) {
        console.log('get user error: ', err)
      }
    }
  };

  componentDidMount = () => {
    if (this.props.getUser) {
      try {
        this.props.getUser()
      } catch(err) {
        console.log('get user error: ', err)
      }
    }
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

const mapDispatchToProps = (dispatch) => {
    return {
      getUser: () =>
        dispatch(getUser())
    }
  };

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
