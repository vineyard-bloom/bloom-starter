import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, updateUser } from 'redux-store/actions/userActions';

// wrapper for account-related methods -- example wrapper. similar to what Connect creates.
class AccountContainer extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
  };

  updateUser = (e, userId, userData) => {
    if (e) { e.preventDefault(); }
    this.props.updateUser(userId, userData)
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    let accountChildren = React.Children.map(children, (child, indx) => {
        return React.cloneElement(child, {
          logout: this.logout
        });
      });

    let end = accountChildren.length > 1 ?
      <div>{ accountChildren }</div>
      : accountChildren[0];

    return end;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (e) => {
      dispatch(logout(e));
    },
    updateUser: (userId, userData) => {
      dispatch(updateUser(userId, userData))
    }
  }
}

export default connect(null, mapDispatchToProps)(AccountContainer);