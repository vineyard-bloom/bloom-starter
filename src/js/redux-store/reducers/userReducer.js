import initialState from '../initialState';
import BigNumber from 'bignumber.js';


export default function userReducer(state = initialState.user, action) {
  let newUser = state;
  switch (action.type) {
    case 'CLEAR_USER':
      return initialState.user;

    case 'LOGIN':
      return { ...action.user }

    case 'UPDATE_USER':
      newUser = action.userData;
      return { ...newUser };

    default:
      return state;
  }
}