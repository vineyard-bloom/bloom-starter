import React from 'react'
import { Link } from 'react-router-dom'

import Logo from 'presentation/logos/logo'
import SubHeader from './sub-header'

import { withContext } from 'components/app/app-context'

import 'styles/components/header.scss'

// this is how context would be wrapped in a stateless component

const Header = props => {
  console.log(props.context)
  return (
    <header className='Header'>
      <Link to='/'>
        <Logo full />
      </Link>
      <SubHeader openModal={props.openModal} user={props.user} />
    </header>
  )
}

export default props => withContext(props)(Header)
