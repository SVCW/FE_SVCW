import {createStore , applyMiddleware} from 'redux'
import logger from 'redux-logger'
import userReducer from './reducers/user'
import rootReducer from './root-reducers'

const middlewares = [logger]
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;