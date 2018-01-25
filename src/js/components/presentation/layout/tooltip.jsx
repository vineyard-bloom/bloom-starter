import React from 'react'
import PropTypes from 'prop-types'

import 'styles/components/tooltip.scss'

class Tooltip extends React.Component {
  state = {
    open: false
  };

  static defaultProps = {
    direction: 'right'
  };

  static propTypes = {
    contents: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    direction: PropTypes.string.isRequired,
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    id: PropTypes.string.isRequired
  };

  closeIfOffTip = e => {
    if (!this.isInsideTheTooltip(e.target)) {
      this.setState({
        open: false
      })
    }
  };

  isInsideTheTooltip = domElement => {
    let parent = domElement
    while (parent && parent.tagName) {
      if (parent.id === this.props.id) {
        return true
      } else if (parent.tagName === 'BODY') {
        return false
      } else {
        parent = parent.parentNode
      }
    }
  };

  toggleOpen = e => {
    e.preventDefault()

    this.setState({
      open: !this.state.open
    })
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.closeIfOffTip)
  };

  componentDidMount = () => {
    // make sure clicking anywhere outside the tooltip closes it
    document.addEventListener('click', this.closeIfOffTip)
  };

  render() {
    const { contents, direction, header, id } = this.props
    return (
      <div className='Tooltip' role='tooltip' aria-live='polite' id={id}>
        <button
          className='Tooltip-icon'
          onClick={this.toggleOpen}
          aria-controls={`tooltip-${id}-content`}
          id={`tooltip-${id}-button`}
        >
          <span className='u-sr-only'>
            Open this tooltip for more information
          </span>
        </button>
        {this.state.open && (
          <div
            className={`Tooltip-contents Tooltip-contents--${direction}`}
            id={`tooltip-${id}-content`}
          >
            {header && <h6>{header}</h6>}
            <div className='Tooltip-contents-text'>{contents}</div>
          </div>
        )}
      </div>
    )
  }
}

export default Tooltip
