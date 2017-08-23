import initialState from '../initialState'
import actionTypes from '../actions/types'

export default function formReducer(state = initialState.forms, action) {
  let newForms = state
  switch (action.type) {
    case actionTypes.ADD_FORM_ERROR:
      if (!newForms[action.formId]) {
        newForms[action.formId] = {}
      }
      if (!newForms[action.formId][action.fieldName]) {
        newForms[action.formId][action.fieldName] = {}
      }
      newForms[action.formId].isValid = false
      newForms[action.formId][action.fieldName].error = action.errorMsg
      return { ...newForms }

    case actionTypes.CLEAR_FORM:
      newForms[action.formId] = {}
      return { ...newForms }

    case actionTypes.CREATE_FORM:
      newForms[action.formId] = action.formObject
      newForms[action.formId].isValid = true
      return { ...newForms }

    case actionTypes.DELETE_FORM_ERROR:
      if (newForms[action.formId] && newForms[action.formId][action.fieldName]) {
        delete newForms[action.formId][action.fieldName].error
      }

      const allOtherErrors = newForms[action.formId]
        ? Object.keys(newForms[action.formId])
          .filter((key) => (key !== action.fieldName) && (!newForms[action.formId][key].error))
        : null

      if (!allOtherErrors.length) {
        newForms[action.formId].isValid = true
      }

      return { ...newForms }

    case actionTypes.UPDATE_FORM:
      if (!newForms[action.formId]) {
        newForms[action.formId] = {}
      }
      if (
        !newForms[action.formId][action.fieldName] ||
        newForms[action.formId][action.fieldName] === ''
      ) {
        newForms[action.formId][action.fieldName] = {}
      }

      newForms[action.formId][action.fieldName].value = action.fieldValue

      return { ...newForms }

    default:
      return state
  }
}