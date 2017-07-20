/* reducers */
import { combineReducers } from 'redux';
import formReducer from './reducers/formReducer';
import modalReducer from './reducers/modalReducer';
import userReducer from './reducers/userReducer';
import servicesReducer from './reducers/servicesReducer';

export default combineReducers({
    services:     servicesReducer,
    forms:        formReducer,
    modal:        modalReducer,
    user:         userReducer
});