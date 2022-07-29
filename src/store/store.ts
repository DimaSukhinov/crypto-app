import {applyMiddleware, combineReducers, createStore} from 'redux';
import {valuesReducer} from './values-reducer';
import {portfolioReducer} from './portfolio-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    values: valuesReducer,
    portfolio: portfolioReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
