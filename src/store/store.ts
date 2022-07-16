import {combineReducers, createStore} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {valuesReducer} from './values-reducer';
import {portfolioReducer} from './portfolio-reducer';

const rootReducer = combineReducers({
    values: valuesReducer,
    portfolio: portfolioReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
