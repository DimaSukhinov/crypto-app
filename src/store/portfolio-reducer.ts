const initialState: PortfolioType[] = []

export const portfolioReducer = (state: PortfolioType[] = initialState, action: ActionsType): PortfolioType[] => {
    switch (action.type) {
        case 'SET-PORTFOLIO':
            return action.portfolio
        case 'ADD-TO-PORTFOLIO':
            const values = [...state, {
                id: action.id,
                name: action.name,
                price: action.price,
                valueCount: action.valueCount
            }]
            localStorage.setItem('portfolio', JSON.stringify(values));
            return values
        case 'REMOVE-FROM-PORTFOLIO':
            return state.filter(p => p.id !== action.id)
        default:
            return state
    }
}

export const setPortfolioAC = (portfolio: any) => {
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
