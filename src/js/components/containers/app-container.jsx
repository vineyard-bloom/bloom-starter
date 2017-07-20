import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import BigNumber from 'bignumber.js';

import { convertWeiToEth } from 'helpers';
import { decrementTimer, initializeCountdown, updateTotals } from 'redux-store/actions';

import Header from 'presentation/navigation/header';
import MainSwitch from 'js/main-switch';
import Modal from 'presentation/modal';

class AppContainer extends React.Component {
  static propTypes = {
    decrementTimer: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object
  };

  initCountdown = () => {
    this.props.WebService.get('/global/countdown')
      .then((res) => {
        this.props.initializeCountdown(res.data);
        window.setTimeout(this.decrementCountdown, 100);
      })
  };

  decrementCountdown = () => {
      this.props.decrementTimer();
      window.setTimeout(this.decrementCountdown, 100);
  };

  checkPosition = (e) => {
    let doc = document.documentElement;
    let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    if (top > 550 && this.props.location.pathname.indexOf('dashboard') > -1) {
      this.rerouteDashboard();
    }
  };

  rerouteDashboard = () => {
    this.props.history.push('/lending');
  };

  recursiveTotals = () => {
    if (this.props.WebService) {
      this.props.WebService.get('/global/stats')
        .then((res) => {
          let data = res.data;
          for (let field in data) {
            if (field.indexOf('total') > -1 || (field.indexOf('amount') > -1) || (field.indexOf('eth') > -1) || (field.indexOf('available') > -1) || (field.indexOf('pending') > -1)) {
              data[field] = convertWeiToEth(new BigNumber(data[field])).toString();
            }
          }
          this.props.updateTotals(data);
        });
    }
    window.setTimeout(this.recursiveTotals, 60000);
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.location.pathname.indexOf('dashboard') > -1 && (this.props.location.pathname.indexOf('dashboard') === -1)) {
      window.addEventListener('scroll', (e) => {
        this.checkPosition();
      });
    }

    if (!newProps.countdown && this.props.countdown) {
      // restart the countdown
      this.recursiveTotals();
      this.initializeCountdown();
    }
  };

  componentDidMount = () => {
    this.initCountdown();

    if (this.props.location.pathname.indexOf('dashboard') > -1) {
      window.addEventListener('scroll', (e) => {
        this.checkPosition();
      });
    }

    this.recursiveTotals();
  };

  render() {
    return (
      <div className='app-container'>
        <Modal />
        <Header />
        <MainSwitch />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    engineState: state.engineState,
    WebService: state.services.WebService
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    decrementTimer: () => {
      dispatch(decrementTimer());
    },
    initializeCountdown: (currentCountdown) => {
      dispatch(initializeCountdown(currentCountdown))
    },
    updateTotals: (data) => {
      dispatch(updateTotals(data));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));