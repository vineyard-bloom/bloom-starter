import { get, post, put } from 'requests'
import * as config from 'config/config.json';

export class WebService {

  get(path) {
    return get(path);
  }

  post(path, data) {
    return post(path, data);
  }

  put(path, data) {
    return put(path, data);
  }

  getUser () {
    return get('/user')
  };

  login ({ username, password, twoFactorConfirmCode }) {
    const data = {
      username: username,
      password: password
    }
    if (twoFactorConfirmCode && twoFactorConfirmCode.length) {
      data['twoFactor'] = twoFactorConfirmCode
    }
    return post('/user/login', data)
  };

  register ({ username, email, password, passwordConfirm, ethPublicAddress, twoFactorConfirmCode }) {
    const data = {
      username: username,
      password: password,
      email: email,
      ethereumAddress: ethPublicAddress
    }
    return post('/user', data)
  };

  updateUserPassword (password) {
    const data = { password: password }
    return put('/user', data)
  };

  logout () {
    return post('/user/logout', {})
  };

  fetchTwoFactorCode () {
    return get('/user/2fa')
  };

  validateTwoFactorToken (token) {
    const data = {
      twoFactor: token
    }
    return post('/user/2fa', data)
  };

  fetchGlobalTotals () {
    return get('/global/stats')
  };

  checkUsernameAvailability (username) {
    return new Promise((resolve, reject) => {
      get('/user/username/available', { value: username }).then(({ data }) => {
        resolve(data.available)
      }).catch(err => reject(err))
    })
  };

  checkEmailAvailability (email) {
    return new Promise((resolve, reject) => {
      get('/user/email/available', { value: email }).then(({ data }) => {
        resolve(data.available)
      }).catch(err => reject(err))
    })
  };

  uploadFile(files) {
    return post('/file/upload?version=1.0', files);
  };

}