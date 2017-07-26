/* reducers */
import { combineReducers } from 'redux';
import alertsReducer from './reducers/alertsReducer';
import formReducer from './reducers/formReducer';
import modalReducer from './reducers/modalReducer';
import servicesReducer from './reducers/servicesReducer';
import userReducer from './reducers/userReducer';

export default combineReducers({
    alerts:       alertsReducer,
    forms:        formReducer,
    modal:        modalReducer,
    services:     servicesReducer,
    user:         userReducer
});