import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'bloom-forms'

import { addAlert } from 'redux-store/actions/alertActions'
import { openModal } from 'redux-store/actions/modalActions'

import ExampleButtons from 'presentation/examples/example-buttons'
import ExampleTable from 'presentation/examples/example-table'

class ExamplesContainer extends React.Component {

  render() {
    const { addAlert, openModal } = this.props

    return (
      <div>
        <h2>Triggerable Elements</h2>
        <Button contents='Open Example Modal' id='example-modal-opener'
            onClick={ (e) => { openModal(e, <div>I'm a modal wee</div>, 'example-modal-opener') } } />
        <Button contents='Open Example Alert' onClick={ e => { e.preventDefault(); addAlert('boop', 'success') } } />
        <h2>Large Components</h2>
        <ul>
          <li>
            <Link to='/example'>Example Form</Link>
          </li>
          <li>
            <Link to='/example/accordion'>Example Accordion</Link>
          </li>
        </ul>
        <ExampleButtons />
        <ExampleTable />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: (message, style='success') => dispatch(addAlert(message, style)),
    openModal: (e, modalContents, triggerId) => dispatch(openModal(e, modalContents, triggerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamplesContainer)
