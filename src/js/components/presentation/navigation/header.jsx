import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { openModal } from 'redux-store/actions/modalActions';

import Button from 'presentation/inputs/button';
import Logo from 'presentation/logos/logo';
import SubHeader from 'presentation/sub-header';

import 'styles/components/header.scss';

const Header = (props) => {
  return (
    <div className='header'>
      Bloom Starter Kit.
      This is an example header.
      <div className='header__top-row'>
        <Link to='/dashboard'>
          <Logo full={ true } />
        </Link>
        <div className='header__top-row__right'>
          <Button text='Open Example Modal' id='example-modal-opener' className='u-inline-block'
            onClick={ (e) => { props.openModal(e, <div>I'm a modal wee</div>) } } />
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
    openModal: (e, modalContents) => {
      dispatch(openModal(e, modalContents));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));