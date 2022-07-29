import {Dispatch} from 'redux';
import {cryptoAPI} from '../api/api';
import {setPortfolioAC} from './portfolio-reducer';

const initialState: ValueType[] = []

export const SET_VALUES = 'SET-VALUES'

export const valuesReducer = (state: ValueType[] = initialState, action: ActionsType): ValueType[] => {
    switch (action.type) {
        case 'SET-VALUES':
            return action.values.map(v => {
                return {...v}
            })
        default:
            return state
    }
}

export const setValuesAC = (values: ValueType[]) => {
    return {type: SET_VALUES, values} as const
}

export const setValuesTC = (setValue: any) => (dispatch: Dispatch) => {
    cryptoAPI.allValues()
        .then((data) => {
            dispatch(setValuesAC(data.data.data))
        })
        .finally(() => {
            let portfolio = localStorage.getItem('portfolio')
            if (portfolio !== null) {
                dispatch(setPortfolioAC(JSON.parse(portfolio)))
            }

            let value = sessionStorage.getItem('value')
            if (value) {
                let newValue = JSON.parse(value)
                setValue(newValue)
            }
        })
}

type ActionsType = ReturnType<typeof setValuesAC>

export type ValueType = {
    id: string
    rank: string
    symbol: string
    name: string
    supply: string
    maxSupply: string | null
    marketCapUsd: string
    volumeUsd24Hr: string
    priceUsd: string
    changePercent24Hr: string
    vwap24Hr: string
    explorer: string
}
