import React from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js'
import { Link } from 'react-router';

import 'styles/components/table';

const Table = ({ reverseSort, ...props }) => {
  const headers = props.headers ? props.headers.map((header, i) => {
    return header.sortable
      ? (
        <th key={ `table-header-${i}` } className={ props.activeSort === header.sortValue ? 'is-active' : '' }>
          <a href='#' onClick={ (e) => { e.preventDefault(); props.changeActiveSort(header.sortValue) } }>
            { header.title }
            <span className='u-sr-only'>Click to sort by this column</span>
          </a>
        </th>
      )
      : (
        <th key={ `table-header-${i}` }>
          { header.title }
        </th>
      );
  }) : [];

  const sortedData = props.data && props.activeSort ? props.data.sort((a,b) => {
    let useBigNumber = false
    let val1 = a[props.activeSort]
    if (!(/\D+/).test(a[props.activeSort])) {
      val1 = new BigNumber(a[props.activeSort] || 0)
      useBigNumber = true
    }
    let val2 = b[props.activeSort]
    if (!(/\D+/).test(b[props.activeSort])) {
      val2 = new BigNumber(b[props.activeSort] || 0)
      useBigNumber = true
    }

    if ((useBigNumber && val1.greaterThan(val2)) || (!useBigNumber && (val1 > val2))) {
      return reverseSort ? 1 : -1;
    } else if ((useBigNumber && val1.lessThan(val2)) || (!useBigNumber && (val1 < val2))) {
      return reverseSort ? -1 : 1;
    } else {
      return 0;
    }
  }) : props.data || [];

  const contentRows = sortedData.length ? sortedData.map((row, i) => {
    let cells = props.headers.map((h, indx) => {
      let key = h.dataValue || h.sortValue

      if (props.linkFields[key]) {
        let url = props.linkFields[h.sortValue];

        if (url.indexOf(':') > -1) {
          const field = url.match(/:(\w+)/)[1]
          url = url.replace(`:${field}`, row[field])
        }

        const link = url.indexOf('http') > -1
          ? (
            <a href={ url } rel='noreferrer noopener' target='_blank'>
              { row[key] }
            </a>
          ) : (
            <Link to={ props.linkFields[h.sort] }>
              { row[key] }
            </Link>
          )

        return (
          <td key={ `table-row-${i}-cell-${indx}` }
            className={ props.activeSort === h.sortValue ? 'is-active' : '' }>
            { link }
          </td>
        )
      } else {
        return (
          <td key={ `table-row-${i}-cell-${indx}` }
            className={ props.activeSort === h.sortValue ? 'is-active' : '' }>
            { row[key] }
          </td>
        )
      }
    });

    return (
      <tr key={ `table-row-${i}` }>
        { cells }
      </tr>
    );
  }) : [
    <tr key='table-row-none'>
      <td colSpan={ headers.length } className='u-text-center'>
        No data to display
      </td>
    </tr>
  ];

  return (
    <table className='Table'>
      <thead>
        <tr>
          { headers }
        </tr>
      </thead>
      <tbody>
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
        sortValue: PropTypes.string,
        dataValue: PropTypes.string /* useful if the presentation of the value != what you want to sort by */
      })
    ).isRequired,
  linkFields: PropTypes.object,
  reverseSort: PropTypes.bool /* required if you want ascending/descending toggle behavior */
}

export default Table;

