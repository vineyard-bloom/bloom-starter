import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const SideBarNav = props => {
  let navs = props.links.map((link, i) => {
    return (
      <li key={`side-nav-${i}`}>
        <Link
          to={link.url}
          className={`Sidebar-link ${
            props.location.pathname.indexOf(link.url) > -1 ? 'is-active' : ''
          }`}
        >
          {link.text}
        </Link>
      </li>
    )
  })

  return <ul className='Sidebar-nav-container'>{navs}</ul>
}

export default withRouter(SideBarNav)
