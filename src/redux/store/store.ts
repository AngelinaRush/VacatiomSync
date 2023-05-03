import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import combineReducers from '../rootReducer'

const store = createStore(combineReducers, applyMiddleware(thunk, logger))

export default store
