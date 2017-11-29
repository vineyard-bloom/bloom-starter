/* reducers */
import { combineReducers } from 'redux';
import { formReducer } from 'bloom-forms';
import alertsReducer from './reducers/alertsReducer';
import modalReducer from './reducers/modalReducer';
import userReducer from './reducers/userReducer';

export default combineReducers({
    alerts:         alertsReducer,
    forms:          formReducer,
    modal:          modalReducer,
    presentation:   presentationReducer,
    user:           userReducer
});