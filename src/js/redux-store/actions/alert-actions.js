import actionTypes from './types'

/* alert action creators */

export function addAlert(message, style = 'success') {
  return {
    type: actionTypes.ADD_ALERT,
    message,
    style
  }
}

export function expireAlert() {
  return {
    type: actionTypes.EXPIRE_ALERT
  }
}

export function hardDeleteAlert(message) {
  return {
    type: actionTypes.HARD_DELETE_ALERT,
    message
  }
}
