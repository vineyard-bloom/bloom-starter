import actionTypes from './types';


/* user action creators */


export function login(user) {
  return {
    type: actionTypes.LOGIN,
    user
  }
}

export function logout() {
  return {
    type: actionTypes.CLEAR_USER
  }
}

export function updateUser(userId, userData) {
  return {
    type: actionTypes.UPDATE_USER,
    userId,
    userData
  }
}