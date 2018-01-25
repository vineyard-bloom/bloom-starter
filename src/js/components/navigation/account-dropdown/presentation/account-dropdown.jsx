import React from 'react'
import Transition from 'react-transition-group/Transition'

import DropdownButton from './account-dropdown-button'

import 'styles/components/account-dropdown'

const AccountDropdown = ({ close, show, ...props }) => {
  const logoutAndClose = e => {
    props.logout(e)
    close(e)
  }

  return (
    <Transition in={!!show} timeout={0}>
      {() => (
        <ul className={`AccountDropdown ${show ? '' : 'is-hidden'}`}>
          <DropdownButton
            onClick={logoutAndClose}
            text='Log out'
            tabIndex={show ? 0 : -1}
          />
        </ul>
      )}
    </Transition>
  )
}

export default AccountDropdown
