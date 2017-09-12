import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { convertEthToWei, convertWeiToEth } from 'helpers'
import { validatorAggregator as validator } from 'validator'
import {
  addFormError,
  clearForm,
  createForm,
  deleteFormError,
  updateForm } from 'redux-store/actions/formActions'
import { WebServiceType } from 'types'

import 'styles/components/forms'
import 'styles/components/inputs'

// container for wrapping all forms with needed methods
class Form extends React.Component {
  state = {
    attemptedSubmit: false,
    prepopulated: false,
    processingRequest: false
  }

  static propTypes = {
    addFormError: PropTypes.func,
    autofillDataRoute: PropTypes.string,
    clearForm: PropTypes.func,
    createForm: PropTypes.func,
    deleteFormError: PropTypes.func,
    fieldNames: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ name: PropTypes.string.isRequired, type: PropTypes.string })
      ])
    ).isRequired,
    forms: PropTypes.object,
    id: PropTypes.string.isRequired,
    submitAsPut: PropTypes.bool,
    submitRoute: PropTypes.string.isRequired,
    updateForm: PropTypes.func,
    WebService: PropTypes.shape(WebServiceType)
  } // make sure only those that don't come from redux are passed in manually

  static mapDispatchToProps(dispatch, ownProps) {
    return {
      addFormError: (formId=ownProps.id, fieldName, errorMessage) => {
        dispatch(addFormError(formId, fieldName, errorMessage))
      },
      clearForm: (formId=ownProps.id) => {
        dispatch(clearForm(formId))
      },
      createForm: (formId=ownProps.id, formObject) => {
        dispatch(createForm(formId, formObject))
      },
      deleteFormError: (formId=ownProps.id, fieldName) => {
        dispatch(deleteFormError(formId, fieldName))
      },
      updateForm: (e=null, formId=ownProps.id, optValue=null, fieldName=null) => {
        if (this.state.attemptedSubmit) {
          this.checkField(e || document.getElementById(fieldName))
        }
        dispatch(updateForm(e, formId, optValue, fieldName))
      }
    }
  }

  static mapStateToProps(state) {
    return {
      forms: state.forms,
      WebService: state.services.WebService
    }
  }

  checkField = (e, elem=null) => {
    const field = elem && elem.getAttribute ? elem : e.target
    const fieldName = field.getAttribute('name')
    const fieldValue = field.value
    
    const isRequired = field.getAttribute('aria-required') || field.getAttribute('required')

    const thisForm = this.props.forms && this.props.forms[this.props.id] ? { ...this.props.forms[this.props.id] } : null
    const fieldStatus = validator({ [fieldName]: { value: fieldValue, validateAs: field.getAttribute('data-validate'), name: fieldName}})

    const allowNull = !isRequired || (fieldValue && isRequired)

    if (fieldStatus.isValid && allowNull) {
      this.props.deleteFormError(this.props.id, fieldName)
    } else {
      this.props.addFormError(this.props.id, fieldName, fieldStatus.warnings[fieldName])
    }
  }

  submitForm = (e) => {
    e.preventDefault()

    this.setState({
      processingRequest: true
    })

    let thisForm = this.props.forms && this.props.forms[this.props.id] ? { ...this.props.forms[this.props.id] } : null
    const unconvertedForm = { ...thisForm }

    let files

    for (let field in thisForm) {
      if (field != 'isValid' && (!/(\.|\/)(gif|jpe?g|png|txt)$/.test(thisForm[field].value)) && (document.getElementById(field))) {
        // validate each field in case onBlur on that field never triggered
        this.checkField(null, document.getElementById(field))
      }

      if (thisForm[field].value) {
        if (field.indexOf('confirm') > -1) {
          delete thisForm[field]
        } else if (/(\.|\/)(gif|jpe?g|png|txt)$/.test(thisForm[field].value)) {
          // file placeholder
          files = files || new FormData()
          files.append(field, document.getElementById(field).files[0], thisForm[field].value)
          delete thisForm[field]
        } else if (field != 'isValid') {
          thisForm[field] = thisForm[field].value
        }
      } else if (field != 'isValid') {
        delete thisForm[field]
      }
    } 

    const call = this.props.submitAsPut ? this.props.WebService.put : this.props.WebService.post;

    if (thisForm && thisForm.isValid) {
      delete thisForm.isValid
      call(this.props.submitRoute, thisForm)
        .then((res) => {
          this.props.clearForm(this.props.id)

          if (files) {
            this.props.WebService.uploadFile(files)
              .then(() => {
                this.setState({
                  processingRequest: false
                })

                if (this.props.afterSubmit) {
                  this.props.afterSubmit(res, unconvertedForm)
                }
              })
          } else if (this.props.afterSubmit) {
            this.setState({
              processingRequest: false
            })
            this.props.afterSubmit(res, unconvertedForm)
          }
        })
        .catch((err) => {
          console.log(err)
          let message = err.response.data.error.message
          this.setState({
            attemptedSubmit: true,
            processingRequest: false
          })
          if (this.props.afterSubmit) {
            this.props.afterSubmit({ error: message })
          }
        })
    } else {
      // debugging helper
      this.setState({
        attemptedSubmit: true,
        processingRequest: false
      })
      console.log(`form id '${this.props.id}' has invalid fields`, thisForm)
    }
  }

  focusOnFirst = () => {
    const form = document.getElementById(this.props.id)
    if (form) {
      let firstInput = [...form.querySelectorAll('input, select, textarea')][0]
      if (firstInput) {
        firstInput.focus()
      }
    }
  }

  manualFieldUpdate = (formId=this.props.id, fieldName, fieldValue) => {
    this.props.updateForm(null, formId, fieldValue, fieldName)
  }

  populateFields = (props, responseData) => {
    let formData = {}
    if (props.forms && props.forms[props.id]) {
      formData = props.forms[props.id]
    } else {
      // initialize the form with all fields inside
      props.fieldNames.forEach((name) => {
        if (name.type) {
          formData[name.name] = {}

          switch(name.type) {
            case 'checkbox':
              formData[name.name].value = false
            default:
              break
          }
        } else {
          formData[name] = { value: '' }
        }
      })
    }

    if (responseData) {
      for (var key in responseData) {
        // explode out any nested fields we might need
        if (typeof responseData[key] == 'object') {
          for (var field in responseData[key]) {
            if (formData[field]) { // we only want fields that exist in the form to update
              formData[field].value = responseData[key][field]
            }
          }
        } else if (formData[key]) {
          formData[key].value = responseData[key]

          if (!this.state.prepopulated && responseData[key]) {
            this.setState({
              prepopulated: true
            })
          }
        }
      }
    }

    props.createForm(props.id, formData)
  }

  componentWillUnmount = () => {
    this.props.clearForm()
  }

  componentDidMount = () => {
    if (this.props.autofillDataRoute && this.props.WebService) {
      this.props.WebService.get(this.props.autofillDataRoute)
        .then((res) => {
          if (res.data) {
            this.populateFields(this.props, res.data)
          }
        })
    } else {
      this.populateFields(this.props)
    }

    this.focusOnFirst()
  }

  componentWillReceiveProps = (newProps) => {
    if (this.props.autofillDataRoute != newProps.autofillDataRoute && newProps.autofillDataRoute && newProps.WebService) {
      newProps.WebService.get(newProps.autofillDataRoute)
        .then((res) => {
          this.populateFields(newProps, res.data)
        })
    } else if (!this.props.WebService && newProps.WebService && (newProps.autofillDataRoute)) {
      newProps.WebService.get(newProps.autofillDataRoute)
        .then((res) => {
          this.populateFields(newProps, res.data)
        })
    }
  }

  render() {
    let { submitRoute, autofillDataRoute, ...props } = this.props
    
    // make sure this works if the form has one child or many
    let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children]
    let thisForm = props.forms && props.forms[props.id] ? props.forms[props.id] : null

    // clone the children to pass in custom props related to entire form
    let formChildren = React.Children.map(children, (child, indx) => {
      return React.cloneElement(child, {
        addFormError: props.addFormError,
        checkField: this.checkField,
        deleteFormError: props.deleteFormError,
        formData: thisForm,
        formId: props.id,
        isValid: thisForm && thisForm.isValid,
        manualFieldUpdate: this.manualFieldUpdate,
        prepopulated: this.state.prepopulated,
        processingRequest: this.state.processingRequest,
        updateForm: props.updateForm,
        submitForm: this.submitForm,
        ...props
      })
    })

    return (
      <div>
        { formChildren }
      </div>
    )
  }
}

export default connect(Form.mapStateToProps, Form.mapDispatchToProps)(Form)
