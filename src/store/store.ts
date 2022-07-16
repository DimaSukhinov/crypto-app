import {combineReducers, createStore} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {valuesReducer} from './values-reducer';
const rootReducer = combineReducers({
    values: valuesReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
