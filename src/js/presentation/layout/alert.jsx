import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition'

import 'styles/components/alerts.scss';

const Alert = (props) => {
  const { currentAlert } = props;
  return (
    <div className={ `Alert-background ${ props.hidden ? 'is-hidden' : '' }` }>
      <Transition in={!!currentAlert} timeout={0}>
        {(status) =>
          <div className={ `Alert Alert--${ currentAlert ? currentAlert.style : '' } decend-${status}` }>
            <div className={ `Alert-icon icons-${ currentAlert ? currentAlert.style : '' }` }></div>
            <div className='Alert-text'>{ currentAlert ? currentAlert.message : '' }</div>
          </div>
        }
      </Transition>
    </div>
  )
}

Alert.propTypes = {
  currentAlert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    style: PropTypes.string
  }),
  hidden: PropTypes.bool
}

export default Alert;