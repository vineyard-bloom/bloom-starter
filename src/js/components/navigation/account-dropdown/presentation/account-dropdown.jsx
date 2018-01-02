import React from 'react';

import DropdownButton from './dropdown-button';

const AccountDropdown = (props) => {
  return (
    <ul className='Dropdown Dropdown--dark'>
      <DropdownButton onClick={ props.logout } text='Log out' />
    </ul>
  )
}

export default AccountDropdown;