import React from 'react';

import 'styles/components/tooltip.scss';

class Tooltip extends React.Component {
  state = {
    open: false
  };

  static defaultProps = {
    direction: 'right'
  }

  static propTypes = {
    contents: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    direction: PropTypes.string.isRequired,
    header: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    id: PropTypes.string.isRequired
  }

  toggleOpen = (e) => {
    e.preventDefault();

    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { contents, direction, header, id } = this.props
    return (
      <div className='Tooltip' role='tooltip' aria-live='polite'>
        <button className='Tooltip-icon' onClick={ this.toggleOpen }
          aria-controls={ `tooltip-${ id }-content` }>
          <span className='u-sr-only'>Open this tooltip for more information</span>
        </button>
        { this.state.open &&
          <div className={ `Tooltip-contents Tooltip-contents--${direction}` }
            id={ `tooltip-${ id }-content` }>
            <h6>{ header }</h6>
            <div className='Tooltip-contents-text'>{ contents }</div>
          </div>
        }
      </div>
    )
  }
}

export default Tooltip;
