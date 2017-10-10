import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BigNumber from 'bignumber.js';

import { convertWeiToEth } from 'helpers';
import { WebServiceType } from 'types';

import { addAlert, expireAlert } from 'redux-store/actions/alertActions';
import { openModal } from 'redux-store/actions/modalActions';

import Alert from 'presentation/layout/alert';
import Header from 'presentation/layout/header';
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
    const { addAlert, alerts, openModal, user } = this.props

    return (
      <div className='app-container'>
        <Header openModal={ openModal } user={ user } addAlert={ addAlert } />
        <MainSwitch />
        <Footer />
        <Alert currentAlert={ alerts[0] } hidden={ !alerts[0] } />
        <Modal />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: (message, style) => {
      return dispatch(addAlert(message, style))
    },
    expireAlert: () => {
      return dispatch(expireAlert());
    },
    openModal: (e, modalContents, triggerId) => {
      dispatch(openModal(e, modalContents, triggerId));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
    user: state.user,
    WebService: state.services.WebService
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));