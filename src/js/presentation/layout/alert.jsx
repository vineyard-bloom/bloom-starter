import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition'

import 'styles/components/alerts.scss';

const Alert = (props) => {
  const { currentAlert } = props;
  return (
    <div aria-hidden={ currentAlert && !!currentAlert.message }
      className={ `Alert-background ${ props.hidden ? 'is-hidden' : '' }` }>
      <Transition in={!!currentAlert} timeout={0}>
        {(status) =>
          <div className={ `Alert Alert--${ currentAlert ? currentAlert.style : '' } descend-${status}` }>
            <div className={ `Alert-icon icons-${ currentAlert ? currentAlert.style : '' }` } role='presentation'></div>
            <div className='u-sr-only'>Alert message: </div>
            <div className='Alert-text' role='alert' aria-live='polite'>
              { currentAlert ? currentAlert.message : '' }
            </div>
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