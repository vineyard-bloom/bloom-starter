import produce from 'immer';

import initialState from '../initialState';
import actionTypes from '../actions/types';

const alertsReducer = (state = initialState.alerts, action) => {
  const messageIndex =
    alert.message && state.map(alert => alert.message).indexOf(action.message);

  return produce(state, draftAlerts => {
    switch (action.type) {
      case actionTypes.ADD_ALERT:
        draftAlerts.push({ message: action.message, style: action.style });
        break;

      case actionTypes.EXPIRE_ALERT:
        draftAlerts.shift();
        break;

      case actionTypes.HARD_DELETE_ALERT:
        if (messageIndex || messageIndex === 0) {
          draftAlerts.splice(messageIndex, 1);
        }
        break;
    }
  });
};

export default alertsReducer;
