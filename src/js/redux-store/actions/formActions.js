import actionTypes from './types';


/* form action creators */

export function addFormError(formId, fieldName, errorMsg) {
  return {
    type: actionTypes.ADD_FORM_ERROR,
    formId,
    fieldName,
    errorMsg
  }
}

export function clearForm(formId) {
  return {
    type: actionTypes.CLEAR_FORM,
    formId: formId
  }
}

export function deleteFormError(formId, fieldName, errorMsg) {
  return {
    type: actionTypes.DELETE_FORM_ERROR,
    formId,
    fieldName,
    errorMsg
  }
}

export function createForm(formId, formObject) {
  return {
    type: actionTypes.CREATE_FORM,
    formId,
    formObject
  }
}

export function updateForm(e, formId) {
  let fieldName = e.target.getAttribute('name');
  let fieldValue = e.target.value;

  return {
    type: actionTypes.UPDATE_FORM,
    formId,
    fieldName,
    fieldValue
  }
}
