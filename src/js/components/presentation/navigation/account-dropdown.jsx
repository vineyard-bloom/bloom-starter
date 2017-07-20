import React from 'react';

import DropdownButton from 'presentation/navigation/dropdown-button';

const AccountDropdown = (props) => {
  return (
    <ul className='dropdown dropdown--dark'>
      <DropdownButton onClick={ props.logout } text='Log out' />
    </ul>
  )
}

export default AccountDropdown;