import produce from 'immer';

import initialState from '../initialState';
import actionTypes from '../actions/types';

const presentationReducer = (state = initialState.presentation, action) =>
  produce(state, draftPresentation => {
    switch (action.type) {
      case actionTypes.FREEZE_UNFREEZE:
        draftPresentation.freezeContent = action.isFrozen;
        break;

      case actionTypes.SET_WINDOW_SIZE:
        draftPresentation.width = action.width;
        draftPresentation.height = action.height;
        break;
    }
  });

export default presentationReducer;
