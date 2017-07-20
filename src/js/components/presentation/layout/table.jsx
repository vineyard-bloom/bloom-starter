import React from 'react';

import 'styles/components/table';

const Table = (props) => {
  let headers = props.headers ? props.headers.map((header, i) => {
    return (
      <th key={ `table-header-${i}` }>
        { header.name }
      </th>
    );
  }) : [];

  let contentRows = props.data ? props.data.map((row, i) => {
    let cells = [];
    props.headers.forEach((header, indx) => {
      cells.push(
        <td key={ `table-row-${i}-cell-${indx}` }>
          { row[header.key] }
        </td>
      );
    })

    return (
      <tr key={ `table-row-${i}` }>
        { cells }
      </tr>
    );
  }) : [];

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

export default Table;
