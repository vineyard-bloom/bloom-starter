import axios from 'axios'
import config from 'config/config.json'

async function request (method, endpoint, data = {}) {
  const url = `${config.api.url}${endpoint}`;
  return axios({
    withCredentials: true,
    method: method,
    url: url,
    data: data
  })
}

export async function get (endpoint, params = {}) {
  const url = config.api.url + endpoint
  params['version'] = params['version'] || config.api.version
  return axios({
    withCredentials: true,
    method: 'get',
    url: url,
    params: params
  })
}

export async function post (endpoint, data = {}) {
  data['version'] = data['version'] || config.api.version
  return request('post', endpoint, data)
}

export async function put (endpoint, data = {}) {
  data['version'] = data['version'] || config.api.version
  return request('put', endpoint, data)
}