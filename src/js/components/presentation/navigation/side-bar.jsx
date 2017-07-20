import React from 'react';

import AccountInfoBox from 'presentation/account-info-box';
import NotificationsBox from 'presentation/notifications-box';
import SideBarNav from 'presentation/navigation/side-bar-nav';

import 'styles/components/side-bar';

const SideBar = (props) => {
  return (
    <div className={ `sidebar ${props.className || ''}` }>
      <AccountInfoBox { ...props.user.account } />
      <SideBarNav links={ [{url: '/lending', text: 'My Lending'}, {url: '/borrowing', text: 'My Borrowing'}]} />
      { props.user.notifications && props.user.notifications[0] ?
        <NotificationsBox notifications={ props.user.notifications } />
        : '' }
    </div>
  );
}

export default SideBar;