import initialState from '../initialState';
import actionTypes from '../actions/types';

export default function userReducer(state = initialState.user, action) {
  let newUser = state;
  switch (action.type) {
    case actionTypes.CLEAR_USER:
      return initialState.user;

    case actionTypes.LOGIN:
      return { ...action.user, loaded: true }

    case actionTypes.UPDATE_USER:
      newUser = action.userData;
      return { ...newUser };

    default:
      return state;
  }
}