import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'bloom-forms'

import { addAlert } from 'redux-store/actions/alertActions'
import { openModal } from 'redux-store/actions/modalActions'

import ExampleButtons from 'components/examples/presentation/example-buttons'
import ExampleTable from 'components/examples/presentation/example-table'
import Tooltip from 'presentation/layout/tooltip'

class ExamplesContainer extends React.Component {
  render() {
    const { addAlert, openModal } = this.props

    return (
      <div>
        <h3>Triggerable Elements</h3>
        <Button
          contents='Open Example Modal'
          id='example-modal-opener'
          onClick={e => {
            openModal(e, <div>I'm a modal wee</div>, 'example-modal-opener')
          }}
        />
        <Button
          contents='Open Example Alert'
          onClick={e => {
            e.preventDefault()
            addAlert('boop', 'success')
          }}
        />
        <div>
          Example Tooltip
          <Tooltip id='example-tooltip' contents='I am so exampley' />
        </div>
        <br />
        <h3>Large Components</h3>
        <ul>
          <li>
            <Link to='/example'>Example Form</Link>
          </li>
          <li>
            <Link to='/example/accordion'>Example Accordion</Link>
          </li>
        </ul>
        <br />
        <ExampleButtons />
        <br />
        <ExampleTable />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (message, style = 'success') =>
      dispatch(addAlert(message, style)),
    openModal: (e, modalContents, triggerId) =>
      dispatch(openModal(e, modalContents, triggerId))
  }
}

export default connect(null, mapDispatchToProps)(ExamplesContainer)
