import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from 'redux-store/actions/userActions';
import { WebServiceType } from 'types';

// wrapper for account-related methods
class AccountContainer extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
    WebService: PropTypes.shape(WebServiceType)
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.WebService.post('/user/logout');
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
    }
  }
}

const mapStateToProps = (state) => {
  return {
    WebService: state.services.WebService
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);