import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BigNumber from 'bignumber.js';

import { convertWeiToEth } from 'helpers';
import { WebServiceType } from 'types';

import { expireAlert } from 'redux-store/actions/alertActions';

import Alert from 'presentation/layout/alert';
import Header from 'presentation/navigation/header';
import Footer from 'presentation/layout/footer';
import MainSwitch from 'js/main-switch';
import Modal from 'presentation/layout/modal';

// App Container is where any global countdowns, etc are initialized and tracked
class AppContainer extends React.Component {
  static propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
      style: PropTypes.string
    })),
    expireAlert: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object,
    WebService: PropTypes.shape(WebServiceType)
  };

  timeoutAlerts = () => {
    if (this.props.alerts[0]) {
      setTimeout(() => {
        this.props.expireAlert();
      }, 5000)
    }
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.alerts[0]) {
      this.timeoutAlerts();
    }
  }

  componentDidMount = () => {
    // init countdowns, event listeners
    // talk to WebService to get any important info
    // etc

    this.timeoutAlerts();
  };

  render() {
    return (
      <div className='app-container'>
        { this.props.alerts[0] ?
          <Alert currentAlert={ this.props.alerts[0] } />
          : '' }
        <Modal />
        <Header />
        <MainSwitch />
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    expireAlert: () => {
      return dispatch(expireAlert());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
    WebService: state.services.WebService
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));