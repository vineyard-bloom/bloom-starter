import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Button } from 'bloom-forms';

import Logo from 'presentation/logos/logo';
import SubHeader from './sub-header';

import 'styles/components/header.scss';

const Header = (props) => {
  return (
    <header className='Header'>
      <Link to='/'>
        <Logo full={ true } />
      </Link>
      <SubHeader openModal={ props.openModal } user={ props.user } />
    </header>
  )
}

export default withRouter(Header);
