import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const SideBarNav = (props) => {
  let navs = props.links.map((link, i) => {
    return (
      <li key={ `side-nav-${i}` }>
        <Link to={ link.url } className={ `sidebar__link ${ props.location.pathname.indexOf(link.url) > -1 ? 'active' : '' }` }>
          { link.text }
        </Link>
      </li>
    );
  });

  return (
    <ul className='sidebar__nav__container'>
      { navs }
    </ul>
  );
}

export default withRouter(SideBarNav);