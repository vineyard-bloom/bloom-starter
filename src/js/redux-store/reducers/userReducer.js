import initialState from '../initialState';
import BigNumber from 'bignumber.js';


export default function userReducer(state = initialState.user, action) {
  let newUser = state;
  switch (action.type) {
    case 'CHANGE_CASH_OFFER_RATIO':
      let newAccount = newUser.account;
      let prevTotal = new BigNumber(newAccount.cash).plus(new BigNumber(newAccount.onOffer));
      newAccount.onOffer = new BigNumber(action.offerVal);
      newAccount.cash = prevTotal.minus(new BigNumber(action.offerVal));

      prevTotal = prevTotal.toString();
      newAccount.onOffer = newAccount.onOffer.toString();
      newAccount.cash = newAccount.cash.toString();

      newUser.account = newAccount;
      return { ...newUser };

    case 'CLEAR_USER':
      return initialState.user; // gives empty user with all the right object keys

    case 'LOGIN':
      return { ...action.user }

    case 'UPDATE_ACCOUNT_STATUS':
      if (action.userId == newUser.id) {
        newUser.account = action.accountInfo;
        return { ...newUser };
      }

    case 'UPDATE_USER':
      newUser = action.userData;
      return { ...newUser };

    default:
      return state;
  }
}