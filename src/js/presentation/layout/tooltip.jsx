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
    ])
  }

  toggleOpen = (e) => {
    e.preventDefault();

    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className='Tooltip'>
        <button className='Tooltip-icon' onClick={ this.toggleOpen }></button>
        { this.state.open &&
          <div className={ `Tooltip-contents Tooltip-contents--${this.props.direction}` }>
            <h6>{ this.props.header }</h6>
            <div className='Tooltip-contents-text'>{ this.props.contents }</div>
          </div>
        }
      </div>
    )
  }
}

export default Tooltip;
