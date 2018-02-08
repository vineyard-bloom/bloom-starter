import { get, post, put } from 'requests'
// import * as config from "config/config.json";

export class WebService {
  checkEmailAvailability = async email => {
    try {
      const res = await get('/user/email/available', { value: email })
      return Promise.resolve(res.data.available)
    } catch (err) {
      throw new Error(err)
    }
  };

  checkUsernameAvailability = async username => {
    try {
      const res = await get('/user/username/available', { value: username })
      return Promise.resolve(res.data.available)
    } catch (err) {
      throw new Error(err)
    }
  };

  fetchTwoFactorSecret = async () => {
    return get('/2fa')
  };

  getUser = async () => {
    return get('/user')
  };

  login = async ({ username, password, twoFactorSecret }) => {
    const data = {
      username: username,
      password: password
    }
    if (twoFactorSecret && twoFactorSecret.length) {
      data['twoFactor'] = twoFactorSecret
    }
    return post('/user/login', data)
  };

  logout = async () => {
    return post('/user/logout', {})
  };

  register = async ({ passwordConfirm, ...data }) => {
    return post('/user', data)
  };

  updateUserPassword = async password => {
    const data = { password: password }
    return put('/user', data)
  };

  uploadFile = async files => {
    return post('/file/upload?version=1.0', files)
  };

  validateTwoFactorToken = async token => {
    return post('/2fa/validate', token)
  };
}
