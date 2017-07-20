import React from 'react';

import 'styles/components/notifications';

const NotificationsBox = (props) => {
  let notifications = props.notifications.map((notif, i) => {
    return (
      <li key={ `notificaton-${i}` } className='notification'>
        { notif.message }
        { notif.details ? <br/> : '' }
        { notif.details || '' }
      </li>
    );
  });

  return (
    <ul className='notification-box'>
      { notifications }
    </ul>
  )
}

export default NotificationsBox;