import React from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { openModal } from 'redux-store/actions';

import BorrowFormContainer from 'containers/borrow-form-container';
import Button from 'presentation/inputs/button';
import CountDownTimer from 'presentation/count-down-timer';
import EngineInterestRate from 'presentation/engine-interest-rate';
import EngineBarGraph from 'presentation/graphs/engine-bar';
import Logo from 'presentation/logos/logo';
import SubHeader from 'presentation/sub-header';

import 'styles/components/header';

const Header = (props) => {
  let fullDash = props.location.pathname.indexOf('dashboard') > -1 ? true : false;
  let graphData = [
    {
      total: props.engineState.totalEth || parseFloat(0),
      available: props.engineState.availableEth || parseFloat(0),
      inE: props.engineState.pendingIn || parseFloat(0),
      outE: props.engineState.pendingOut || parseFloat(0)
    }
  ];

  graphData[0].staticE = graphData[0].available - graphData[0].outE || parseFloat(0);

  let xData = ['static', 'in', 'out'];

  let graphInfo = {
    data: graphData,
    options: { xData },
    width: 300,
    height: 100
  };

  return (
    <CSSTransitionGroup
      transitionName="fold"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>

      <div className={ `header ${fullDash ? 'header--dashboard' : '' }` }>
        <div className='header__top-row'>
          <Link to='/dashboard'>
            <Logo full={ true } />
          </Link>
          <div className='header__top-row__right'>
            { !fullDash ?
              <EngineBarGraph { ...graphInfo } />
              : '' }
            <EngineInterestRate className='header__interest-rate' />
            { props.user.id ?
              <Button text='Borrow Now' onClick={ () => { props.openModal(<BorrowFormContainer />) } } className='u-inline-block' />
              : '' }
          </div>
        </div>
        { fullDash ?
          <div className='header__dashboard-content'>
            <CountDownTimer />
            <EngineBarGraph { ...graphInfo } sizeLarge={ true } />
          </div>
          : '' }
        { props.user.id ?
          <SubHeader graphInfo={ graphInfo } />
          : '' }
      </div>

    </CSSTransitionGroup>
  )
}

const mapStateToProps = (state) => {
  return {
    engineState: state.engineState || {},
    user: state.user || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modalContents) => {
      dispatch(openModal(modalContents));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));