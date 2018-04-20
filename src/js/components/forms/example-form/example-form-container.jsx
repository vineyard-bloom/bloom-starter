import React from 'react'
import { connect } from 'react-redux'
import { Form, formActions } from 'bloom-forms'

import ExampleForm from './presentation/example-form'

class ExampleFormContainer extends React.Component {
  rerouteAfterSubmit = () => {
    // this.props.history.push('/lending')
  }

  submitForm = async (formData, files, successCallback, failCallback) => {
    console.log(formData)
    try {
      // const res = await callToWebService(formData)
      // this.rerouteAfterSubmit(res)
      successCallback()
    } catch (err) {
      failCallback(err)
    }
  }

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
      'onlyBloop',
      'textarea'
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
        <ExampleForm
          checkMultipleFields={this.props.checkMultipleFields}
          checkForVisibleFields={this.props.checkForVisibleFields}
        />
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkMultipleFields: (formId = 'example-form', fieldNames) =>
      dispatch(formActions.checkMultipleFields(formId, fieldNames)),
    checkForVisibleFields: (formId = 'example-form', fieldNames) =>
      dispatch(formActions.checkForVisibleFields(formId, fieldNames))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user || {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ExampleFormContainer
)
