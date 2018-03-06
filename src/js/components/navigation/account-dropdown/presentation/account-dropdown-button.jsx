import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AccountDropdownButton = ({ id, url, tabIndex, ...props }) => {
  return url ? (
    <Link to={url} key={id} tabIndex={tabIndex || 0}>
      <li className='AccountDropdown-link'>{props.text}</li>
    </Link>
  ) : (
    <a href='#' onClick={props.onClick} tabIndex={tabIndex || 0} key={id}>
      <li className='AccountDropdown-link'>{props.text}</li>
    </a>
  )
}

AccountDropdownButton.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string,
  tabIndex: PropTypes.number
}

export default AccountDropdownButton
