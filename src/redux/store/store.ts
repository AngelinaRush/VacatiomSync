import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import commonReducer from '../rootReducer'

const store = createStore(commonReducer, applyMiddleware(thunk, logger))

export default store
