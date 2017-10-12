import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import bloomApp from 'redux-store/reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  bloomApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default store;