import initialState from '../initialState';

export default function alertsReducer(state = initialState.alerts, action) {
  let newAlerts = state;
  switch (action.type) {
    case 'ADD_ALERT':
      return newAlerts.concat({ message: action.message, style: action.style });

    case 'EXPIRE_ALERT':
      return newAlerts.length ? newAlerts.slice(1) : [];

    case 'HARD_DELETE_ALERT':
      let messageIndex = newAlerts.map((alert) => alert.message).indexOf(action.message);
      return messageIndex
        ? newAlerts.slice(0,messageIndex).concat((newAlerts.slice(messageIndex+1)))
        : newAlerts;

    default:
      return state;
  }
}