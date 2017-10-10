import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Button } from 'bloom-forms';

import Logo from 'presentation/logos/logo';
import SubHeader from 'presentation/layout/sub-header';

import 'styles/components/header.scss';

const Header = (props) => {
  return (
    <div className='header'>
      Bloom Starter Kit.
      This is an example header.
      <div className='header__top-row'>
        <Link to='/'>
          <Logo full={ true } />
        </Link>
        <div className='header__top-row__right'>
          <Button text='Open Example Modal' id='example-modal-opener' className='u-inline-block'
            onClick={ (e) => { props.openModal(e, <div>I'm a modal wee</div>, 'example-modal-opener') } } />
        </div>
      </div>
      <SubHeader openModal={ props.openModal } user={ props.user } />
    </div>
  )
}

export default withRouter(Header);