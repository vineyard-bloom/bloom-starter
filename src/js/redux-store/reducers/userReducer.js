import initialState from '../initialState'
import actionTypes from '../actions/types'

export default function userReducer(state = initialState.user, action) {
  let newUser = state
  switch (action.type) {
    case actionTypes.CLEAR_USER:
      return { ...initialState.user, loaded: true }

    case actionTypes.LOGIN:
      return { ...action.user, loaded: true }

    case actionTypes.UPDATE_USER:
      newUser = { ...action.userData, loaded: true }
      return { ...newUser }

    default:
      return state
  }
}
