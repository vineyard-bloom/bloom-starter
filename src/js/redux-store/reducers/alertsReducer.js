import initialState from '../initialState';

export default function alertsReducer(state = initialState.alerts, action) {
  let newAlerts = state;
  switch (action.type) {
    case 'ADD_ALERT':
      return newAlerts.concat({ message: action.message, type: action.style });

    default:
      return state;
  }
}