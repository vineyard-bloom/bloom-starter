import React from 'react'
import PropTypes from 'prop-types'

import 'styles/components/tooltip'

const ErrorTip = (props) => {
  return (
    <div className={ `tooltip tooltip--error ${ props.className || '' }` }>
      <div className={ `tooltip__contents tooltip__contents--${ props.direction }` }>
        <div className='tooltip__contents__text'>{ props.contents }</div>
      </div>
    </div>
  )
}

ErrorTip.defaultProps = {
  direction: 'top'
}

ErrorTip.propTypes = {
  className: PropTypes.string,
  contents: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  direction: PropTypes.string.isRequired
}

export default ErrorTip