import { AuthenticatedUser } from './authenticated-user-stub';

var loggedIn = true;

export class WebServiceStub {

  checkEmailAvailability (email) {
    return Promise.resolve({ data: 'success' });
  };

  checkUsernameAvailability (username) {
    return Promise.resolve({ data: true });
  };

  getUser () {
    const user = loggedIn ? AuthenticatedUser : {};
    return Promise.resolve({ data: user });
  };

  fetchTwoFactorSecret () {
    const ret = {
      'secret': 'LVHGW4ZMHFCVWKKQLVZD4YKUKVQVI426PFUTIMS5OVASCWTVEVZQ'
    }
    return Promise.resolve({ data: ret })
  };

  login ({ username, password, twoFactorSecret }) {
    if (username === 'froggy' && password === 'test' && twoFactorSecret) {
      this.loggedIn = true
      return Promise.resolve({ data: AuthenticatedUser })
    } else {
      return Promise.reject(new Error('Invalid Credentials'))
    }
  };

  logout () {
    loggedIn = false
    return Promise.resolve({})
  };

  register ({ username, email, password, passwordConfirm, ethPublicAddress, twoFactorSecret }) {
    const fakeuser = {
      ...AuthenticatedUser,
      username: username,
      password: password
    }
    loggedIn = true
    return Promise.resolve({ data: fakeuser })
  };

  uploadFile(files) {
    return Promise.resolve({});
  };

  updateUserPassword (password) {
    return Promise.resolve({ data: {} })
  };

  validateTwoFactorToken (token) {
    const ret = {'message': 'Verification succeeded.'}
    return Promise.resolve({ data: ret })
  };
}