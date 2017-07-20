import initialState from '../initialState';

export default function formReducer(state = initialState.forms, action) {
  let newForms = state;
  switch (action.type) {
    case 'ADD_FORM_ERROR':
      if (!newForms[action.formId]) {
        newForms[action.formId] = {};
      }
      if (!newForms[action.formId][action.fieldName]) {
        newForms[action.formId][action.fieldName] = {};
      }
      newForms[action.formId][action.fieldName].error = action.errorMsg;
      return { ...newForms };

    case 'CLEAR_FORM':
      newForms[action.formId] = {};
      return { ...newForms };

    case 'CREATE_FORM':
      newForms[action.formId] = action.formObject;
      return { ...newForms };

    case 'DELETE_FORM_ERROR':
      newForms[action.formId].error = '';
      return { ...newForms };

    case 'UPDATE_FORM':
      if (!newForms[action.formId]) {
        newForms[action.formId] = {};
      }
      if (!newForms[action.formId][action.fieldName] || (newForms[action.formId][action.fieldName] == '')) {
        newForms[action.formId][action.fieldName] = {};
      }
      newForms[action.formId][action.fieldName].value = action.fieldValue;

      return { ...newForms };

    default:
      return state;
  }
}