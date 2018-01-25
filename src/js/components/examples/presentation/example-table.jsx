import React from 'react'
import Table from 'presentation/layout/table'

import { humanFormatDate } from 'helpers'

// I am an example table container, but all the other examples live in /presentation so I'm here too
class ExampleTableContainer extends React.Component {
  render() {
    const headers = [
      {
        title: 'Name',
        sortable: true,
        sortValue: 'name'
      },
      {
        title: 'Age',
        sortable: false,
        sortValue: 'age'
      },
      {
        title: 'Joined',
        sortable: true,
        sortValue: 'created',
        displayValue: 'formattedJoined'
      }
    ]

    const exampleData = [
      {
        name: 'Bob',
        age: '45',
        created: '2017-03-11T06:54:22.933Z',
        formattedJoined: humanFormatDate('2017-03-11T06:54:22.933Z')
      },
      {
        name: 'Weasley',
        age: '31',
        created: '2017-10-04T09:12:22.933Z',
        formattedJoined: humanFormatDate('2017-10-04T09:12:22.933Z')
      },
      {
        name: 'Bianca',
        age: '2',
        created: '2017-11-22T18:16:22.933Z',
        formattedJoined: humanFormatDate('2017-11-22T18:16:22.933Z')
      }
    ]

    const query = {
      useServer: false,
      pagination: {},
      sort: {
        activeField: 'name'
      }
    }

    return (
      <div>
        <h3>Example Table</h3>
        <Table headers={headers} data={exampleData} query={query} />
      </div>
    )
  }
}

export default ExampleTableContainer
