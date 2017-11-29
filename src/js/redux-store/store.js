import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import bloomApp from 'redux-store/reducers'

const store = process.env.NODE_ENV === 'dev'
  ? createStore(
    bloomApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
  ) : (
    createStore(
      bloomApp,
      applyMiddleware(thunkMiddleware)
    )
  )

export default store;