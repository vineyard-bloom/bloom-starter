import { AuthenticatedUser } from './authenticated-user-stub';

var loggedIn = true;

export class WebServiceStub {

  get (reqStr) {
    switch (reqStr) {
      case '/user/read':
        return this.getUser();
      default:
        return Promise.resolve({ error: 'invalid route' });
    }
  };

  post(reqStr, data) {
    switch (reqStr) {
      case '/user/new':
        return this.register(data);
      default:
        return Promise.resolve({ error: 'invalid route' });
    }
  }

  getUser () {
    const user = loggedIn ? AuthenticatedUser : {};
    return Promise.resolve({ data: user });
  };

  login ({ username, password, twoFactorConfirmCode }) {
    if (username === 'testuser' && password === 'test' && twoFactorConfirmCode) {
      this.loggedIn = true
      return Promise.resolve({ data: AuthenticatedUser })
    } else {
      return Promise.resolve({})
    }
  };

  register ({ username, email, password, passwordConfirm, ethPublicAddress, twoFactorConfirmCode }) {
    const fakeuser = {
      username: username,
      password: password,
      id: 'd81738e8-213b-4bf5-9ec9-26d98944728b',
      walletAddress: '0xde0B295669a9FD93d5F28D9Ec8540f4cb697BAe',
      account: {
        cash: 0.0,
        debts: 0.0,
        lent: 0.0,
        offered: 0.0,
        status: 'Good'
      },
      borrowingHistory: [],
      notifications: [],
      lendingHistory: [],
      lendingInfo: {
        lifetimeInterest: 0,
        defaulted: 0
      }
    }
    loggedIn = true
    return Promise.resolve({ data: fakeuser })
  };

  updateUserPassword (password) {
    return Promise.resolve({ data: {} })
  };

  logout () {
    loggedIn = false
    return Promise.resolve({})
  };

  fetchTwoFactorCode () {
    const ret = {
      'secret': 'LVHGW4ZMHFCVWKKQLVZD4YKUKVQVI426PFUTIMS5OVASCWTVEVZQ'
    }
    return Promise.resolve({ data: ret })
  };

  validateTwoFactorToken (token) {
    const ret = {'message': 'Verification succeeded.'}
    return Promise.resolve({ data: ret })
  };

  fetchExchangeRate () {
    const ret = {
      'sources': [
        {
          'price': '2215.16',
          'volume': '18302.07150000',
          'exchange': 'gdax'
        },
        {
          'price': '2239.09',
          'volume': '12912.13540026',
          'exchange': 'bitstamp'
        },
        {
          'price': '2216.28',
          'volume': '13542.4108917675',
          'exchange': 'gemini'
        },
        {
          'price': '2231.51',
          'volume': '2124.82280000',
          'exchange': 'itbit'
        },
        {
          'price': '2217.33200',
          'volume': '6765.72110031',
          'exchange': 'kraken'
        },
        {
          'price': '2165.2',
          'volume': '18035.68725094',
          'exchange': 'bitfinex'
        }
      ],
      'price': 2222.1238520949046,
      'date': '2017-05-30T21:46:39.814Z'
    }
    return Promise.resolve({ data: ret })
  };

  fetchGlobalTotals () {
    const ret = {
      availableEth: 13253.93,
      totalEth: 17937.83
    }
    return Promise.resolve({ data: ret })
  };

}