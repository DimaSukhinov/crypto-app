const initialState: ValuesType[] = []

export const valuesReducer = (state: ValuesType[] = initialState, action: ActionsType): ValuesType[] => {
    switch (action.type) {
        case 'SET-VALUES':
            return action.values.map(v => {
                return {...v}
            })
        default:
            return state
    }
}

export const setValuesAC = (values: ValuesType[]) => {
    return {type: 'SET-VALUES', values} as const
}

type ActionsType = ReturnType<typeof setValuesAC>

export type ValuesType = {
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
