const initialState: ValueType[] = []

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
    return {type: 'SET-VALUES', values} as const
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
