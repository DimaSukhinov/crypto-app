const initialState: PortfolioType[] = []

export const portfolioReducer = (state: PortfolioType[] = initialState, action: ActionsType): PortfolioType[] => {
    switch (action.type) {
        case 'ADD-TO-PORTFOLIO':
            return [...state, {id: action.id, valueCount: action.valueCount, price: action.price}]
        case 'REMOVE-FROM-PORTFOLIO':
            return state.filter(p => p.id !== action.id)
        default:
            return state
    }
}

export const addToPortfolioAC = (id: string, valueCount: number, price: string) => {
    return {type: 'ADD-TO-PORTFOLIO', id, valueCount, price} as const
}
export const removeFromPortfolioAC = (id: string) => {
    return {type: 'REMOVE-FROM-PORTFOLIO', id} as const
}

type ActionsType = ReturnType<typeof addToPortfolioAC> | ReturnType<typeof removeFromPortfolioAC>

export type PortfolioType = {
    id: string
    valueCount: number
    price: string
}
