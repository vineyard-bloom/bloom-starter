/* reducers */
import { combineReducers } from 'redux'
import { formReducer } from 'bloom-forms'
import alertsReducer from './reducers/alerts-reducer'
import modalReducer from './reducers/modal-reducer'
import presentationReducer from './reducers/presentation-reducer'
import userReducer from './reducers/user-reducer'

export default combineReducers({
  alerts: alertsReducer,
  forms: formReducer,
  modal: modalReducer,
  presentation: presentationReducer,
  user: userReducer
})
