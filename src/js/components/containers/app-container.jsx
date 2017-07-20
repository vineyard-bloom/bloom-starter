import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BigNumber from 'bignumber.js';

import { convertWeiToEth } from 'helpers';
import { WebServiceType } from 'types';

import Header from 'presentation/navigation/header';
import Footer from 'presentation/layout/footer';
import MainSwitch from 'js/main-switch';
import Modal from 'presentation/layout/modal';

// App Container is where any global countdowns, etc are initialized and tracked
class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    WebService: PropTypes.shape(WebServiceType)
  };

  componentDidMount = () => {
    // init countdowns, event listeners
    // talk to WebService to get any important info
    // etc
  };

  render() {
    return (
      <div className='app-container'>
        <Modal />
        <Header />
        <MainSwitch />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    WebService: state.services.WebService
  }
}

export default withRouter(connect(mapStateToProps)(AppContainer));