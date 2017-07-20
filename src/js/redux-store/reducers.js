/* reducers */
import { combineReducers } from 'redux';
import formReducer from './reducers/formReducer';
import engineReducer from './reducers/engineReducer';
import modalReducer from './reducers/modalReducer';
import userReducer from './reducers/userReducer';
import servicesReducer from './reducers/servicesReducer';

export default combineReducers({
    services:     servicesReducer,
    engineState:  engineReducer,
    forms:        formReducer,
    modal:        modalReducer,
    user:         userReducer
});