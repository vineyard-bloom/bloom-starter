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
    <header className='Header'>
      Bloom Starter Kit.
      This is an example header.
      <div className='Header-top-row'>
        <Link to='/'>
          <Logo full={ true } />
        </Link>
        <div className='Header-top-row-right'>
          <Button contents='Open Example Modal' id='example-modal-opener' className='u-inline-block'
            onClick={ (e) => { props.openModal(e, <div>I'm a modal wee</div>, 'example-modal-opener') } } />
        </div>
      </div>
      <a href='#' onClick={ e => { e.preventDefault(); props.addAlert('boop', 'success') } }>Example Alert</a>
      <SubHeader openModal={ props.openModal } user={ props.user } />
    </header>
  )
}

export default withRouter(Header);