import config from 'config/config.json';

import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import bloomApp from 'redux-store/reducers';

const store =
  config.app.environment === 'development'
    ? createStore(
        bloomApp,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunkMiddleware)
      )
    : createStore(bloomApp, applyMiddleware(thunkMiddleware));

export default store;
