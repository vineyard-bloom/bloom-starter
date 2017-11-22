import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BigNumber from 'bignumber.js';

import { convertWeiToEth } from 'helpers';
import { getUser } from 'redux-store/actions/userActions';
import { UserType } from 'types';

import ExamplesContainer from 'containers/examples-container';
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
      <div className='Home'>
        <SideBar user={ this.props.user } />
        <div className='Home-content'>
          <h1>Main Content Here</h1>
          <p>Below is an overview of some basic elements used throughout the starterkit.</p>
          <ExamplesContainer />
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
