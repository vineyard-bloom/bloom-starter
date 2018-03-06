import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logout, updateUser } from 'redux-store/actions/userActions'
import AccountDropdown from './presentation/account-dropdown'

class AccountDropdownContainer extends React.Component {
  static propTypes = {
    logout: PropTypes.func
  };

  updateUser = (e, userId, userData) => {
    if (e) {
      e.preventDefault()
    }
    this.props.updateUser(userId, userData)
  };

  logout = e => {
    e.preventDefault()
    this.props.logout()
  };

  render() {
    return <AccountDropdown logout={this.logout} {...this.props} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: e => dispatch(logout(e)),
    updateUser: (userId, userData) => dispatch(updateUser(userId, userData))
  }
}

export default connect(null, mapDispatchToProps)(AccountDropdownContainer)
