import React from 'react';
import SVGInline from "react-svg-inline";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'bloom-forms';

import { openModal } from 'redux-store/actions/modalActions';

import AccountDropdown from 'components/navigation/account-dropdown';

import downCarrot from 'images/inline-svgs/down_carrot.svg';

import 'styles/components/subheader.scss';

// this has only ui-level logic, no app logic, so even though it's a class, it's presentational
class SubHeader extends React.Component {

  state = {
    showDropdown: false
  };

  toggleDropdown = (e) => {
    e.preventDefault();

    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };

  componentWillReceiveProps = (newProps) => {
    if (!newProps.user.id) {
      this.setState({
        showDropdown: false
      });
    }
  };

  render() {
    let { user } = this.props;

    return (
      <div className={ `SubHeader ${ this.props.location.pathname.indexOf('dashboard') > -1 ? 'u-no-margin' : '' }` }>
        { user && user.username &&
          <div className='SubHeader-user'>
            { user.username }
            <a href='#' onClick={ this.toggleDropdown }>
              <SVGInline svg={ downCarrot } />
            </a>
          </div>
        }
        { this.state.showDropdown ?
          <AccountDropdown />
        : '' }
      </div>
    )
  }
}

export default withRouter(SubHeader);
