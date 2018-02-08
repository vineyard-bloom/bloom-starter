import initialState from '../initialState'
import actionTypes from '../actions/types'

export default function modalReducer(state = initialState.modal, action) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        modalContents: action.modalContents,
        modalTriggerId: action.modalTriggerId
      }

    case actionTypes.CLOSE_MODAL:
      return { ...state, modalContents: null }

    default:
      return state
  }
}
