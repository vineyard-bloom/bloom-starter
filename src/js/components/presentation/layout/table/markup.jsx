import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { SelectInput } from 'bloom-forms'

import Loading from 'presentation/layout/loading'

import 'styles/components/table'

// only markup to see here
const Table = props => {
  const renderHeaders = (headers, sortByThisHeader) => {
    const { sort } = props
    const { activeField } = sort

    return headers.map((header, i) => {
      const classes = `${header.className || ''} ${
        activeField === header.sortValue
          ? sort.reverse ? 'is-active is-reverse' : 'is-active'
          : ''
      }`
      return header.sortable ? (
        <th key={`table-header-${i}`} className={classes}>
          <a href='#' onClick={e => sortByThisHeader(e, header)}>
            {header.title}
            <span className='u-sr-only'>Click to sort by this column</span>
          </a>
        </th>
      ) : (
        <th key={`table-header-${i}`} className={classes}>
          {header.title}
        </th>
      )
    })
  }

  const renderPagination = (contentLength, pagination, pages) => {
    const { triggerPaginate } = props
    const currentPageNumber = pagination.offset / pagination.limit
    const goNext = e => {
      e.preventDefault()
      triggerPaginate(
        currentPageNumber < pages.length ? currentPageNumber + 1 : pages.length
      )
    }
    const goBack = e => {
      e.preventDefault()
      triggerPaginate(currentPageNumber > 0 ? currentPageNumber - 1 : 0)
    }

    return (
      <div className='Table-pagination'>
        <a
          href='#'
          onClick={goBack}
          className={`Table-pagination-prevNextButton ${
            pagination.offset === 0 ? 'is-disabled' : ''
          }`}
        >
          {'\u003c\u00a0'}Back
        </a>
        <SelectInput
          name='go-to-page'
          onChange={(formId, name, val) => {
            triggerPaginate(val - 1)
          }}
          value={currentPageNumber ? currentPageNumber + 1 : 1}
          label='Go to Page:'
          options={pages}
          typeAhead={false}
        />
        <a
          href='#'
          onClick={goNext}
          className={`Table-pagination-prevNextButton ${
            currentPageNumber + 1 === pages.length ? 'is-disabled' : ''
          }`}
        >
          Next{'\u00a0\u003e'}
        </a>
      </div>
    )
  }

  const renderRows = data => {
    const { headers, linkFields, sort } = props
    const { activeField } = sort

    return data.map((row, i) => {
      let cells = headers.map((h, indx) => {
        let key = h.displayValue || h.sortValue

        if (linkFields && linkFields[key]) {
          let url = linkFields[h.sortValue]

          if (url.indexOf(':') > -1) {
            const field = url.match(/:(\w+)/)[1]
            url = url.replace(`:${field}`, row[field])
          }

          const link =
            url.indexOf('http') > -1 ? (
              <a href={url} rel='noreferrer noopener' target='_blank'>
                {row[key]}
              </a>
            ) : (
              <Link to={linkFields[h.sort]}>{row[key]}</Link>
            )

          return (
            <td
              key={`table-row-${i}-cell-${indx}`}
              className={activeField === h.sortValue ? 'is-active' : ''}
            >
              {link}
            </td>
          )
        } else {
          return (
            <td
              key={`table-row-${i}-cell-${indx}`}
              className={activeField === h.sortValue ? 'is-active' : ''}
            >
              {row[key]}
            </td>
          )
        }
      })

      return <tr key={`table-row-${i}`}>{cells}</tr>
    })
  }

  const {
    data,
    loading,
    pagination,
    sortByThisHeader,
    totalDataLength
  } = props

  const headers = props.headers
    ? renderHeaders(props.headers, sortByThisHeader)
    : []
  const contentRows = data.length
    ? renderRows(data)
    : [
        <tr key='table-row-none'>
          <td colSpan={headers.length} className='u-text-center'>
            No data to display
          </td>
        </tr>
      ]

  const pages = []
  for (var i = 0; i < Math.ceil(totalDataLength / pagination.limit); i++) {
    pages.push(i + 1)
  }
  const paginationRow =
    pagination && pagination.limit < totalDataLength
      ? renderPagination(totalDataLength, pagination, pages)
      : null

  return (
    <div className={props.className || ''}>
      <table className='Table'>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {loading ? (
            <tr key='table-row-loading'>
              <td colSpan={headers.length} className='u-text-center'>
                <Loading />
              </td>
            </tr>
          ) : (
            contentRows
          )}
        </tbody>
      </table>
      {paginationRow}
    </div>
  )
}

Table.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.object
  ) /* object keys should all match header sortValues */,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      sortable: PropTypes.bool,
      sortValue: PropTypes.string,
      displayValue:
        PropTypes.string /* useful if the presentation of the value != what you want to sort by */
    })
  ).isRequired,
  linkFields:
    PropTypes.object /* example: { 'id': '/product/:id', 'name': '/organization/:name' } */,
  loading: PropTypes.bool,
  pagination: PropTypes.shape({
    limit: PropTypes.number,
    offset: PropTypes.number
  }),
  sort: PropTypes.shape({
    activeField: PropTypes.string,
    reverse: PropTypes.bool
  }),
  sortByThisHeader: PropTypes.func,
  totalDataLength: PropTypes.number,
  triggerPaginate: PropTypes.func
}

export default Table
