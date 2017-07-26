import React from 'react';

import 'styles/components/alerts.scss';

const Alert = (props) => {
  return (
    <div className={ `alert alert--${ props.currentAlert.style }` }>
      { props.currentAlert.message }
    </div>
  )
}

export default Alert;