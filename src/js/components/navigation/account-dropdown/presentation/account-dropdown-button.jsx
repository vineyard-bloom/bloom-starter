import React from 'react'
import { Link } from 'react-router-dom'

const AccountDropdownButton = ({ key, url, tabIndex, ...props }) => {
  let end = url ? (
    <Link to={url} key={props.key} tabIndex={tabIndex || 0}>
      <li className='AccountDropdown-link'>{props.text}</li>
    </Link>
  ) : (
    <a href='#' onClick={props.onClick} tabIndex={tabIndex || 0}>
      <li key={key} className='AccountDropdown-link'>
        {props.text}
      </li>
    </a>
  )

  return end
}

export default AccountDropdownButton
