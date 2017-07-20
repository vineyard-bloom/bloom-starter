import initialState from '../initialState';
import BigNumber from 'bignumber.js';

export default function engineReducer(state = initialState.engineState, action) {
  let timer = state.countdown;
  switch (action.type) {
    case 'COUNTDOWN':
      if (timer > 100) {
        timer = timer-100;
        return { ...state, countdown: timer }
      } else {
        return { ...state }
      }
    case 'INITIALIZE_COUNTDOWN':
      return { ...state, countdown: action.currentCountdown }
    case 'START_NEW_COUNTDOWN':
      timer = action.timerSeconds;
      return { ...state, countdown: timer }
    case 'UPDATE_TOTALS':
      if (new BigNumber(action.data.total || action.data.totalEth).lessThan(0) || (new BigNumber(action.data.availableEth || action.data.available).lessThan(0))) {
        throw new Error('not enough funds in system');
      }

      return {
        ...state,
        totalEth: action.data.total.toString(),
        availableEth: action.data.available.toString(),
        interestRate: action.data.interestRate.toString()
      };

    default:
      return state;
  }
}