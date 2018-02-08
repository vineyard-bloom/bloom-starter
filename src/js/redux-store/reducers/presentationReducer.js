import initialState from '../initialState'
import actionTypes from '../actions/types'

export default function presentationReducer(
  state = initialState.presentation,
  action
) {
  let newState = state
  switch (action.type) {
    case actionTypes.FREEZE_UNFREEZE:
      return { ...newState, freezeContent: action.isFrozen }

    case actionTypes.SET_WINDOW_SIZE:
      return { ...newState, width: action.width, height: action.height }

    default:
      return state
  }
}
