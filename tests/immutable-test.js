import { describe, it } from 'mocha'
import * as assert from 'assert'
import { applyMiddleware, createStore } from 'redux'
import reducers from '../src/js/redux-store/reducers'
import thunkMiddleware from 'redux-thunk'

import {
  addAlert,
  expireAlert
} from '../src/js/redux-store/actions/alertActions'

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

describe('Redux store is immutable', () => {
  it('Dispatched action affects appropriate reducer', () => {
    const prevStore = store.getState()
    store.dispatch(addAlert('Example alert', 'warning'))
    assert.ok(prevStore)

    assert.notEqual(prevStore.alerts.length, store.getState().alerts.length)

    store.dispatch(expireAlert())
    assert.equal()
  })

  it('Does not allow store to be changed via mutation', () => {
    assert.equal(Object.isExtensible(store.getState().alerts), false)
    assert.equal(Object.isExtensible(store.getState().modal), false)
    assert.equal(Object.isExtensible(store.getState().user), false)
    assert.equal(Object.isExtensible(store.getState().presentation), false)
  })
})
