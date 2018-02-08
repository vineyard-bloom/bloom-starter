import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form, formActions } from 'bloom-forms'

import { addAlert } from 'redux-store/actions/alertActions'
import { createUser } from 'redux-store/actions/userActions'

import ExampleForm from './presentation/example-form'

class ExampleFormContainer extends React.Component {
  rerouteAfterSubmit = () => {
    this.props.history.push('/lending')
  };

  submitForm = async (formData, files, successCallback, failCallback) => {
    try {
      const res = await this.props.createUser(formData)
      this.rerouteAfterSubmit(res)
    } catch (err) {
      this.props.addAlert(err)
      failCallback(err)
    }
  };

  render() {
    const fieldNames = [
      'textinput',
      'password',
      'checkbox',
      'radio',
      'radio2',
      'date',
      'currency',
      'select',
      'select2',
      'toggle',
      'file-simple',
      'file-simple-2',
      'file-droppable',
      'onlyBloop'
    ]

    const validationHelp = {
      dictionary: {
        'must-equal-bloop': testData =>
          testData !== 'bloop' ? 'Sorry, this field has to be "bloop."' : null
      }
    }

    return (
      <Form
        id='example-form'
        fieldNames={fieldNames}
        submitForm={this.submitForm}
        validationHelp={validationHelp}
      >
        <ExampleForm checkMultipleFields={this.props.checkMultipleFields} />
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (message, style = 'warning') =>
      dispatch(addAlert(message, style)),
    checkMultipleFields: (formId = 'example-form', fieldNames) =>
      dispatch(formActions.checkMultipleFields(formId, fieldNames)),
    createUser: userData => dispatch(createUser(userData))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user || {}
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExampleFormContainer)
)
