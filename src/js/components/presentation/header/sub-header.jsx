import React from 'react';
import SVGInline from "react-svg-inline";
import { withRouter } from 'react-router';

import AccountDropdownContainer from 'components/navigation/account-dropdown';
import HamburgerButton from 'layout/hamburger-button';

import { openModal } from 'redux-store/actions/modalActions';
import downCarrot from 'images/inline-svgs/down_carrot.svg';

import 'styles/components/subheader.scss';

// this has only ui-level logic, no app logic, so even though it's a class, it's presentational
class SubHeader extends React.Component {

  state = {
    showDropdown: false,
    showMobileMenu: false
  };

  toggleDropdown = (e) => {
    if (e) { e.preventDefault(); }

    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };

  toggleMobileMenu = (e) => {
    this.setState({
      showMobileMenu: !this.state.showMobileMenu
    })
  }

  componentWillReceiveProps = (newProps) => {
    if (!newProps.user.id) {
      this.setState({
        showDropdown: false
      });
    }
  };

  render() {
    const { user } = this.props;
    const { showDropdown, showMobileMenu } = this.state

    return (
      <div style={{ alignItems: 'center', display: 'flex', height: '100%' }}>
        <div className={ `SubHeader ${ showDropdown ? 'is-open' : '' }` }>
          { user && user.username &&
            <a href='#' onClick={ this.toggleDropdown } className='SubHeader-user'>
              { user.username }
              <SVGInline svg={ downCarrot } />
            </a>
          }
          <AccountDropdownContainer show={ showDropdown } close={ this.toggleDropdown } />
        </div>
        <div className='SubHeader--mobile'>
          <HamburgerButton id='sub-header-hamburger'
            isOpen={ showMobileMenu }
            onClick={ this.toggleMobileMenu }
          />
        </div>
      </div>
    )
  }
}

export default withRouter(SubHeader);
