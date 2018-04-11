import config from 'config/config.json'

import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import bloomApp from 'redux-store/reducers'

import initialState from './initial-state'

const store =
  config.app.environment === 'development'
    ? createStore(
        bloomApp,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunkMiddleware)
      )
    : createStore(bloomApp, initialState, applyMiddleware(thunkMiddleware))

export default store
