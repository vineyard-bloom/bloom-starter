import React from 'react'
import BigNumber from 'bignumber.js'
import PropTypes from 'prop-types'

import TableMarkup from './markup'

/* eslint-disable- no-console */

// This is like a container, but it's still all internal presentation logic -- just too much going on for one component
class TableDataHandler extends React.Component {
  state = {
    activeData: [],
    activeFilters: [],
    pagination: {
      limit: 10,
      offset: 0
    },
    sort: {
      activeField: '',
      reverse: false /* for ascending/descending toggle behavior */
    }
  };

  static propTypes = {
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
    loading: PropTypes.bool,
    linkFields: PropTypes.object,
    query: PropTypes.shape({
      /* Query is for server-side pagination, sorting, filtering, but *also* any initializing of client-side pagination, sorting, etc. */
      useServer: PropTypes.bool,
      activeFilters: PropTypes.array,
      pagination: PropTypes.shape({
        limit: PropTypes.number,
        offset: PropTypes.number
      }),
      sort: PropTypes.shape({
        activeField: PropTypes.string,
        reverse:
          PropTypes.bool /* required if you want ascending/descending toggle behavior */
      })
    }).isRequired,
    requestData: PropTypes.func
  };

  static defaultProps = {
    data: []
  };

  sortData = (data, querySort = null) => {
    // only used for client side sorting
    const sort = querySort || this.state.sort
    const activeSort = sort.activeField
    const reverseSort = sort.reverse

    return data.sort((a, b) => {
      let useBigNumber = false
      let val1 = a[activeSort]
      if (!/\D+/.test(a[activeSort])) {
        val1 = new BigNumber(a[activeSort] || 0)
        useBigNumber = true
      }
      let val2 = b[activeSort]
      if (!/\D+/.test(b[activeSort])) {
        val2 = new BigNumber(b[activeSort] || 0)
        useBigNumber = true
      }

      if (
        (useBigNumber && val1.greaterThan(val2)) ||
        (!useBigNumber && val1 > val2)
      ) {
        return reverseSort ? 1 : -1
      } else if (
        (useBigNumber && val1.lessThan(val2)) ||
        (!useBigNumber && val1 < val2)
      ) {
        return reverseSort ? -1 : 1
      } else {
        return 0
      }
    })
  };

  componentWillReceiveProps = newProps => {
    const { query } = this.props
    const paginationChanged =
      query &&
      newProps.query &&
      newProps.query.pagination &&
      (newProps.query.pagination.limit != query.pagination.limit ||
        newProps.query.pagination.offset != query.pagination.offset)
    const sortChanged =
      query &&
      newProps.query &&
      newProps.query.sort &&
      (newProps.query.sort.activeField != query.sort.activeField ||
        newProps.query.sort.reverse != query.sort.reverse)
    const filtersChanged =
      query &&
      newProps.query &&
      newProps.query.activeFilters &&
      (newProps.query.activeFilters
        .map(obj => obj.key)
        .sort()
        .toString() !=
        query.activeFilters
          .map(obj => obj.key)
          .sort()
          .toString() ||
        newProps.query.activeFilters
          .map(obj => obj.value)
          .sort()
          .toString() !=
          query.activeFilters
            .map(obj => obj.value)
            .sort()
            .toString())

    if (
      query &&
      query.useServer &&
      (paginationChanged || sortChanged || filtersChanged)
    ) {
      // the server side data has been queried
      this.setState({
        activeData: newProps.data,
        activeFilters: newProps.query.activeFilters,
        sort: newProps.query.sort,
        pagination: newProps.query.pagination
      })
    }

    if (newProps.data) {
      this.setState({
        activeData: newProps.data
      })
    }
  };

  componentDidMount() {
    const { data, query, ...props } = this.props

    // initialize our state with any pagination or sorting if we're using front end query functionality
    if (query && !query.useServer) {
      this.triggerPaginate = clientSideMethods(this).triggerPaginate
      this.sortByThisHeader = clientSideMethods(this).sortByThisHeader

      let activeData = data

      if (data && data.length) {
        const offset =
          query.pagination && query.pagination.offset
            ? query.pagination.offset
            : 0
        const limit =
          query.pagination && query.pagination.limit
            ? query.pagination.limit
            : null
        activeData = limit ? data.slice(offset, limit) : activeData
        if (query.sort && query.sort.activeField) {
          activeData = this.sortData(activeData, query.sort)
        }
      }

      const { useServer, ...queryProps } = query
      this.setState({
        ...this.state,
        ...queryProps,
        pagination: {
          ...this.state.pagination,
          ...queryProps.pagination
        },
        sort: {
          ...this.state.sort,
          ...queryProps.sort
        },
        activeData: activeData
      })
    } else {
      this.triggerPaginate = serverSideMethods(this).triggerPaginate
      this.sortByThisHeader = serverSideMethods(this).sortByThisHeader

      this.setState({
        activeData: data || []
      })

      // we're using the server. make sure we have requestData
      if (!props.requestData) {
        console.log(
          '%c\n\nYou must pass in a `requestData` function to <Table/> if your sorting, filtering, etc. are executed via server.\n\n',
          'color: red'
        )
      }
    }
  }

  render() {
    const { data, query, requestData, ...markupProps } = this.props
    const { activeData, ...markupQuery } = this.state

    const queryData = query && query.useServer ? query : markupQuery

    return (
      <TableMarkup
        triggerPaginate={this.triggerPaginate}
        sortByThisHeader={this.sortByThisHeader}
        {...markupProps}
        {...queryData}
        data={activeData}
        totalDataLength={data.length}
      />
    )
  }
}

TableDataHandler.displayName = 'TableDataHandler'

function clientSideMethods(self) {
  return {
    sortByThisHeader: (e, header) => {
      if (e) {
        e.preventDefault()
      }

      const newSort = {
        activeField: header.sortValue,
        reverse:
          self.state.sort.activeField === header.sortValue
            ? !self.state.sort.reverse
            : false // first click defaults to false
      }
      const newPagination = {
        ...self.state.pagination,
        offset: 0 // sorting should kick user back to first page
      }
      const newActiveData = self.sortData(self.props.data, newSort)

      self.setState({
        activeData: newPagination.limit
          ? newActiveData.slice(newPagination.offset || 0, newPagination.limit)
          : newActiveData,
        pagination: newPagination,
        sort: newSort
      })
    },

    triggerPaginate: pageNumber => {
      const totalOffset = pageNumber * (self.state.pagination.limit || 0)
      const existingSort = self.state.sort

      const newActiveData = self.state.pagination.limit
        ? self
            .sortData(self.props.data, existingSort)
            .slice(totalOffset, self.state.pagination.limit + totalOffset)
        : self.sortData(self.props.data, existingSort).slice(totalOffset)

      self.setState({
        activeData: newActiveData,
        pagination: {
          ...self.state.pagination,
          offset: totalOffset
        }
      })
    }
  }
}

function serverSideMethods(self) {
  return {
    triggerPaginate: pageNumber => {
      const { query } = self.props
      const totalOffset = pageNumber * (query.pagination.limit || 0)
      self.props.requestData({
        ...query,
        pagination: {
          ...query.pagination,
          offset: totalOffset
        }
      })
    },

    sortByThisHeader: (e, header) => {
      if (e) {
        e.preventDefault()
      }
      const { query } = self.props
      self.props.requestData({
        ...query,
        sort: {
          ...query.sort,
          activeField: header.sortValue,
          reverse:
            query.sort.activeField === header.sortValue && !query.sort.reverse
        },
        pagination: {
          /* when changing the sort, we want to go back to the first page */
          ...query.pagination,
          offset: 0
        }
      })
    }
  }
}

export default TableDataHandler
