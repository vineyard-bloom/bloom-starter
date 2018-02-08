/* eslint-disable no-unused-vars */
import { AuthenticatedUser } from './authenticated-user-stub'

var loggedIn = true

export class WebServiceStub {
  checkEmailAvailability = async email => {
    return Promise.resolve({ data: 'success' })
  };

  checkUsernameAvailability = async username => {
    return Promise.resolve({ data: true })
  };

  getUser = async () => {
    const user = loggedIn ? AuthenticatedUser : {}
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve({ data: user })
      }, 2000)
    })
  };

  fetchTwoFactorSecret = async () => {
    const ret = {
      secret: 'LVHGW4ZMHFCVWKKQLVZD4YKUKVQVI426PFUTIMS5OVASCWTVEVZQ'
    }
    return Promise.resolve({ data: ret })
  };

  login = async ({ username, password, twoFactorSecret }) => {
    if (username === 'froggy' && password === 'test' && twoFactorSecret) {
      this.loggedIn = true
      return Promise.resolve({ data: AuthenticatedUser })
    } else {
      throw new Error('Invalid Credentials')
    }
  };

  logout = async () => {
    loggedIn = false
    return Promise.resolve({})
  };

  register = async ({
    username,
    email,
    password,
    passwordConfirm,
    ethPublicAddress,
    twoFactorSecret
  }) => {
    const fakeuser = {
      ...AuthenticatedUser,
      username: username,
      password: password
    }
    loggedIn = true
    return Promise.resolve({ data: fakeuser })
  };

  uploadFile = async files => {
    return Promise.resolve({})
  };

  updateUserPassword = async password => {
    return Promise.resolve({ data: {} })
  };

  validateTwoFactorToken = async token => {
    const ret = { message: 'Verification succeeded.' }
    return Promise.resolve({ data: ret })
  };
}
