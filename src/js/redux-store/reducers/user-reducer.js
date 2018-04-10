import produce from 'immer'
import initialState from '../initial-state'
import actionTypes from '../actions/types'

const userReducer = (state = initialState.user, action) =>
  produce(state, draftUser => {
    switch (action.type) {
      case actionTypes.CLEAR_USER:
        return { ...initialState.user, loaded: true }

      case actionTypes.LOGIN:
        return { ...action.user, loaded: true }

      case actionTypes.UPDATE_USER:
        return { ...draftUser, ...action.userData, loaded: true }
    }
  })

export default userReducer
