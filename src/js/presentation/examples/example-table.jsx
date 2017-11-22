import React from 'react'
import Table from 'presentation/layout/table'

import { humanFormatDate } from 'helpers'

// I am an example table container, but all the other examples live in /presentation so I'm here too
class ExampleTableContainer extends React.Component {
  state = {
    activeSort: 'name',
    reverseSort: false
  }

  changeActiveSort = (sortValue) => {
    this.setState({
      activeSort: sortValue,
      reverseSort: this.state.activeSort === sortValue
        ? (this.state.reverseSort ? false : true)
        : false // first click defaults to false
    })
  }

  render() {
    const { activeSort, reverseSort } = this.state
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
        dataValue: 'formattedJoined'
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


    return (
      <div>
        <h2>Example Table</h2>
        <Table headers={ headers } data={ exampleData } activeSort={ activeSort } reverseSort={ reverseSort }
          changeActiveSort={ this.changeActiveSort }
        />
      </div>
    )
  }
}

export default ExampleTableContainer