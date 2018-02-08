import initialState from '../initialState'
import actionTypes from '../actions/types'

export default function alertsReducer(state = initialState.alerts, action) {
  let newAlerts = state

  const messageIndex =
    alert.message &&
    newAlerts.map(alert => alert.message).indexOf(action.message)

  switch (action.type) {
    case actionTypes.ADD_ALERT:
      return newAlerts.concat({ message: action.message, style: action.style })

    case actionTypes.EXPIRE_ALERT:
      return newAlerts.length ? newAlerts.slice(1) : []

    case actionTypes.HARD_DELETE_ALERT:
      return messageIndex
        ? newAlerts
            .slice(0, messageIndex)
            .concat(newAlerts.slice(messageIndex + 1))
        : newAlerts

    default:
      return state
  }
}
