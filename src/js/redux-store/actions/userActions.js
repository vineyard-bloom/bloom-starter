import actionTypes from './types';

/* user action creators */

export function getUser() {
  return (dispatch) =>
    WebService.getUser()
      .then(res => {
        dispatch(updateUser(res.data.id, res.data))
        return Promise.resolve(res)
      })
}

export function login(user) {
  return (dispatch) => 
    WebService.login(user)
      .then(res => {
        dispatch({
          type: actionTypes.LOGIN,
          user: res.data
        })
        return Promise.resolve(res)
      })
}

export function logout() {
  return (dispatch) =>
    WebService.logout()
      .then(res => {
        dispatch({
          type: actionTypes.CLEAR_USER
        })
        return Promise.resolve(res)
      })
}

export function createUser(userData) {
  return (dispatch) =>
    WebService.register(userData)
      .then(res => {
        dispatch(login(userData))
        return Promise.resolve(res)
      })
}

export function updateUser(userId, userData) {
  return {
    type: actionTypes.UPDATE_USER,
    userId,
    userData
  }
}
