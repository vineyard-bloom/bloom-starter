import { get, post, put } from 'requests'
import * as config from 'config/config.json';

export class WebService {

  checkEmailAvailability (email) {
    return new Promise((resolve, reject) => {
      get('/user/email/available', { value: email })
        .then(({ data }) => {
          resolve(data.available)
        })
        .catch(err => reject(err))
    })
  };

  checkUsernameAvailability (username) {
    return new Promise((resolve, reject) => {
      get('/user/username/available', { value: username })
        .then(({ data }) => {
          resolve(data.available)
        })
        .catch(err => reject(err))
    })
  };

  fetchTwoFactorCode() {
    return get('/2fa')
  };

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

  logout () {
    return post('/user/logout', {})
  };

  register ({ username, email, password, passwordConfirm, ethPublicAddress, twoFactorConfirmCode }) {
    const data = {
      username: username,
      password: password,
      email: email
    }
    return post('/user', data)
  };

  updateUserPassword (password) {
    const data = { password: password }
    return put('/user', data)
  };

  uploadFile(files) {
    return post('/file/upload?version=1.0', files);
  };

  validateTwoFactorToken(token) {
    return post('/2fa/validate', token)
  }

}