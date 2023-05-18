import { applyMiddleware, legacy_createStore as createStore, Middleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import commonReducer from '../rootReducer'

const REACT_APP_USE_REDUX_LOGGER = process.env.REACT_APP_USE_REDUX_LOGGER

const middlewares = [thunk, REACT_APP_USE_REDUX_LOGGER && logger].filter(Boolean) as Middleware<any, any, any>[]

const store = createStore(commonReducer, applyMiddleware(...middlewares))

export default store
