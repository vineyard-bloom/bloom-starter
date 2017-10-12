import React from 'react';
import { Link } from 'react-router-dom';

const DropdownButton = (props) => {
    let end = props.url ?
      (
        <Link to={ props.url } key={ props.key }>
          <li className='dropdown__link'>
            { props.text }
          </li>
        </Link>
      )
      :
      (
        <a href='#' onClick={ props.onClick }>
          <li key={ props.key } className='dropdown__link'>
            { props.text }
          </li>
        </a>
      );

  return end;
}

export default DropdownButton;