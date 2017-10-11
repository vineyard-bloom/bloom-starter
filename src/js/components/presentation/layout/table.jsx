import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import 'styles/components/table';

const Table = (props) => {
  let headers = props.headers ? props.headers.map((header, i) => {
    return header.sortable
      ? (
        <th key={ `table-header-${i}` }>
          <a href='#' onClick={ () => props.changeActiveSort(h.sortValue) }>
            { header.title }
          </a>
        </th>
      )
      : (
        <th key={ `table-header-${i}` }>
          { header.title }
        </th>
      );
  }) : [];

  let sortedData = props.data && props.activeSort ? props.data.sort((a,b) => {
    if (a[props.activeSort] > b[props.activeSort]) {
      return 1;
    } else if (a[props.activeSort] < b[props.activeSort]) {
      return -1;
    } else {
      return 0;
    }
  }) : props.data || [];

  let contentRows = sortedData.map((row, i) => {
    let cells = props.headers.map((h, indx) => {
      if (props.linkFields[h.sortValue]) {
        let url = props.linkFields[h.sortValue];

        if (url.indexOf(':') > -1) {
          // should replace any '/:id' type params with the row's id (or whatever) field -- test me
          let temp = url.split('/');
          let replaceIndex = temp.indexOf(/\:\S+/);

          temp[replaceIndex] = row[temp[replaceIndex].replace(':', '')];

          url = temp.join('/')
        }

        return (
          <td key={ `table-row-${i}-cell-${indx}` }>
            <Link to={ props.linkFields[h.sort] }>
              { row[h.sortValue] }
            </Link>
          </td>
        )
      } else {
        return <td key={ `table-row-${i}-cell-${indx}` }>{ row[h.sortValue] }</td>
      }
    });

    return (
      <tr key={ `table-row-${i}` }>
        { cells }
      </tr>
    );
  });

  return (
    <table className='table'>
      <tbody>
        <tr>
          { headers }
        </tr>
        { contentRows }
      </tbody>
    </table>
  )
}

// example linkFields:
// { 'id': '/product/:id', 'name': '/organization/:name' }

Table.propTypes = {
  activeSort: PropTypes.string,
  changeActiveSort: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object), /* object keys should all match header sortValues */
  headers: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        sortable: PropTypes.bool,
        sortValue: PropTypes.string
      })
    ).isRequired,
  linkFields: PropTypes.object
}

export default Table;
