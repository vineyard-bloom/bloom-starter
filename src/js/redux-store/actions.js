/* action types */

const ADD_FORM_ERROR =          'ADD_FORM_ERROR';
const CHANGE_CASH_OFFER_RATIO = 'CHANGE_CASH_OFFER_RATIO';
const CLEAR_FORM  =             'CLEAR_FORM';
const CLEAR_USER =              'CLEAR_USER';
const CLOSE_MODAL =             'CLOSE_MODAL';
const COUNTDOWN =               'COUNTDOWN';
const CREATE_FORM =             'CREATE_FORM';
const DELETE_FORM_ERROR =       'DELETE_FORM_ERROR';
const INITIALIZE_COUNTDOWN =    'INITIALIZE_COUNTDOWN';
const LOGIN =                   'LOGIN';
const OPEN_MODAL  =             'OPEN_MODAL';
const START_NEW_COUNTDOWN =     'START_NEW_COUNTDOWN';
const SUBMIT_FORM =             'SUBMIT_FORM';
const UPDATE_ACCOUNT_STATUS =   'UPDATE_ACCOUNT_STATUS';
const UPDATE_FORM =             'UPDATE_FORM';
const UPDATE_TOTALS =           'UPDATE_TOTALS';
const UPDATE_USER           =   'UPDATE_USER';

/* action creators */

export function addFormError(formId, fieldName, errorMsg) {
  return {
    type: ADD_FORM_ERROR,
    formId,
    fieldName,
    errorMsg
  }
}

export function changeCashOfferRatio(offerVal) {
  return {
    type: CHANGE_CASH_OFFER_RATIO,
    offerVal
  }
}

export function clearForm(formId) {
  return {
    type: CLEAR_FORM,
    formId: formId
  }
}

export function deleteFormError(formId, fieldName, errorMsg) {
  return {
    type: DELETE_FORM_ERROR,
    formId,
    fieldName,
    errorMsg
  }
}

export function decrementTimer() {
  return {
    type: COUNTDOWN
  }
}

export function createForm(formId, formObject) {
  return {
    type: CREATE_FORM,
    formId,
    formObject
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function initializeCountdown(currentCountdown) {
  return {
    type: INITIALIZE_COUNTDOWN,
    currentCountdown
  }
}

export function login(user) {
  return {
    type: LOGIN,
    user
  }
}

export function logout() {
  return {
    type: CLEAR_USER
  }
}

export function openModal(modalContents) {
  return {
    type: OPEN_MODAL,
    modalContents
  }
}

export function startNewCountdown(timerSeconds) {
  return {
    type: START_NEW_COUNTDOWN,
    timerSeconds
  }
}

export function updateForm(e, formId) {
  let fieldName = e.target.getAttribute('name');
  let fieldValue = e.target.value;

  return {
    type: UPDATE_FORM,
    formId,
    fieldName,
    fieldValue
  }
}

export function updateAccountStatus(userId, accountInfo) {
  return {
    type: UPDATE_ACCOUNT_STATUS,
    userId,
    accountInfo
  }
}

export function updateTotals(data) {
  return {
    type: UPDATE_TOTALS,
    data
  }
}

export function updateUser(userId, userData) {
  return {
    type: UPDATE_USER,
    userId,
    userData
  }
}