import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { openModal } from 'redux-store/actions/modalActions';

import Button from 'presentation/inputs/button';
import Logo from 'presentation/logos/logo';
import SubHeader from 'presentation/sub-header';

const Header = (props) => {
  return (
    <div className='header'>
      <div className='header__top-row'>
        <Link to='/dashboard'>
          <Logo full={ true } />
        </Link>
        <div className='header__top-row__right'>
          <Button text='Open Example Modal' onClick={ () => { props.openModal(<div>I'm a modal wee</div>) } } className='u-inline-block' />
        </div>
      </div>
      <SubHeader />
    </div>
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