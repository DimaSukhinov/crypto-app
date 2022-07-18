const initialState: PortfolioType[] = []

export const portfolioReducer = (state: PortfolioType[] = initialState, action: ActionsType): PortfolioType[] => {
    switch (action.type) {
        case 'SET-PORTFOLIO':
            return action.portfolio
        case 'ADD-TO-PORTFOLIO':
            let value = {id: action.id, name: action.name, valueCount: action.valueCount, price: action.price}
            const val = state.find(s => s.id === action.id)
            let newState = state
            if (val) {
                newState = state.filter(p => p.id !== action.id)
                value = {
                    id: action.id,
                    name: action.name,
                    valueCount: action.valueCount + val.valueCount,
                    price: action.price
                }
            }
            const values = [...newState, value]
            localStorage.setItem('portfolio', JSON.stringify(values))
            return values
        case 'REMOVE-FROM-PORTFOLIO':
            const filteredValues = state.filter(p => p.id !== action.id)
            localStorage.setItem('portfolio', JSON.stringify(filteredValues))
            return filteredValues
        default:
            return state
    }
}

export const setPortfolioAC = (portfolio: PortfolioType[]) => {
    return {type: 'SET-PORTFOLIO', portfolio} as const
}
export const addToPortfolioAC = (id: string, name: string, price: number, valueCount: number) => {
    return {type: 'ADD-TO-PORTFOLIO', id, name, price, valueCount} as const
}
export const removeFromPortfolioAC = (id: string) => {
    return {type: 'REMOVE-FROM-PORTFOLIO', id} as const
}

type ActionsType =
    ReturnType<typeof setPortfolioAC>
    | ReturnType<typeof addToPortfolioAC>
    | ReturnType<typeof removeFromPortfolioAC>

export type PortfolioType = {
    id: string
    name: string
    price: number
    valueCount: number
}
