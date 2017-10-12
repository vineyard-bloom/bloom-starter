import actionTypes from './types';

/* user action creators */

export function login(user) {
  return (dispatch) => 
    WebService.login(user)
      .then(res => dispatch({
        type: actionTypes.LOGIN,
        user: res.data
      }))
}

export function logout() {
  return (dispatch) =>
    WebService.logout()
      .then(res => dispatch({
        type: actionTypes.CLEAR_USER
      }))
}

export function updateUser(userId, userData) {
  return {
    type: actionTypes.UPDATE_USER,
    userId,
    userData
  }
}

export function getUser() {
  return (dispatch) =>
    WebService.getUser()
      .then(res => dispatch(updateUser(res.data.id, res.data)))
}