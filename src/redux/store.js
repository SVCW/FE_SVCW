import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import reduxThunk from 'redux-thunk';
import { AchivementReducer } from './reducers/AchivementReducer';



const rootReducer = combineReducers({
    AchivementReducer,
})

let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const store = createStore(rootReducer, composeCustom);