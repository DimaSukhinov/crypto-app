const initialState: PortfolioType[] = [];

export const SET_PORTFOLIO = 'SET-PORTFOLIO';
export const ADD_TO_PORTFOLIO = 'ADD-TO-PORTFOLIO';
export const REMOVE_FROM_PORTFOLIO = 'REMOVE-FROM-PORTFOLIO';

export const portfolioReducer = (state: PortfolioType[] = initialState, action: ActionsType): PortfolioType[] => {
  switch (action.type) {
    case 'SET-PORTFOLIO':
      return action.portfolio;
    case 'ADD-TO-PORTFOLIO':
      let value = action.portfolio;
      const val = state.find(s => s.id === value.id);
      let newState = state;
      if (val) {
        newState = state.filter(p => p.id !== value.id);
        value = { ...value, valueCount: value.valueCount + val.valueCount };
      }
      const values = [...newState, value];
      localStorage.setItem('portfolio', JSON.stringify(values));
      return values;
    case 'REMOVE-FROM-PORTFOLIO':
      const filteredValues = state.filter(p => p.id !== action.id);
      localStorage.setItem('portfolio', JSON.stringify(filteredValues));
      return filteredValues;
    default:
      return state;
  }
};

export const setPortfolioAC = (portfolio: PortfolioType[]) => {
  return { type: SET_PORTFOLIO, portfolio } as const;
};
export const addToPortfolioAC = (portfolio: PortfolioType) => {
  return { type: ADD_TO_PORTFOLIO, portfolio } as const;
};
export const removeFromPortfolioAC = (id: string) => {
  return { type: REMOVE_FROM_PORTFOLIO, id } as const;
};

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
