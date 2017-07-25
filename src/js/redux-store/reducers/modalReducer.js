import initialState from '../initialState';

export default function modalReducer(state = initialState.modal, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalContents: action.modalContents,
        modalTriggerId: action.modalTriggerId
      };

    case 'CLOSE_MODAL':
      return { ...state, modalContents: null };

    default:
      return state;
  }
}
