import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

import DropdownButton from './account-dropdown-button';

import 'styles/components/account-dropdown';

const AccountDropdown = ({ close, show, ...props }) => {
  const logoutAndClose = e => {
    props.logout(e);
    close(e);
  };

  return (
    <Transition in={!!show} timeout={0}>
      {() => (
        <ul className={`AccountDropdown ${show ? '' : 'is-hidden'}`}>
          <DropdownButton
            id="dropdown-1"
            onClick={logoutAndClose}
            text="Log out"
            tabIndex={show ? 0 : -1}
          />
        </ul>
      )}
    </Transition>
  );
};

AccountDropdown.propTypes = {
  close: PropTypes.func.isRequired,
  logout: PropTypes.func,
  show: PropTypes.bool.isRequired
};

export default AccountDropdown;
