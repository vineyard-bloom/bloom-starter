import actionTypes from './types'

/* user action creators */

export function getUser() {
  return async dispatch => {
    try {
      const res = await WebService.getUser()
      dispatch(updateUser(res.data.id, res.data))
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}

export function login(user) {
  return async dispatch => {
    try {
      const res = await WebService.login(user)
      dispatch({
        type: actionTypes.LOGIN,
        user: res.data
      })
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}

export function logout() {
  return async dispatch => {
    try {
      const res = await WebService.logout()
      dispatch({ type: actionTypes.CLEAR_USER })
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}

export function createUser(userData) {
  return async dispatch => {
    try {
      const res = await WebService.register(userData)
      dispatch(login(res))
      return res
    } catch (err) {
      throw new Error(err)
    }
  }
}

export function updateUser(userId, userData) {
  return {
    type: actionTypes.UPDATE_USER,
    userId,
    userData
  }
}
