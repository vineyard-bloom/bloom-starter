import produce from 'immer';

import initialState from '../initialState';
import actionTypes from '../actions/types';

const modalReducer = (state = initialState.modal, action) =>
  produce(state, draftModal => {
    switch (action.type) {
      case actionTypes.OPEN_MODAL:
        draftModal.modalContents = action.modalContents;
        draftModal.modalTriggerId = action.modalTriggerId;
        break;

      case actionTypes.CLOSE_MODAL:
        draftModal.modalContents = null;
        break;
    }
  });

export default modalReducer;
