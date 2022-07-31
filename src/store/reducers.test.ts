import {
    addToPortfolioAC, portfolioReducer, PortfolioType,
    removeFromPortfolioAC, setPortfolioAC
} from './portfolio-reducer';
import {setValuesAC, valuesReducer, ValueType} from './values-reducer';

test('correct values should be set', () => {
    const startState: ValueType[] = []

    const newState: ValueType[] = [
        {
            id: 'bitcoin', rank: '1', changePercent24Hr: '3.1367184772434482', explorer: 'https://blockchain.info/',
            marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Bitcoin',
            priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
            volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843'
        },
        {
            id: 'ethereum', rank: '2', changePercent24Hr: '3.1367184772434482', explorer: 'https://blockchain.info/',
            marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Ethereum',
            priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
            volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843'
        },
    ]

    const endState = valuesReducer(startState, setValuesAC(newState))

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe('bitcoin');
    expect(endState[1].id).toBe('ethereum');
});

test('correct values should be set to portfolio from localStorage', () => {
    const startState: PortfolioType[] = []

    const newState: PortfolioType[] = [
        {id: 'firstId', name: 'newValue', valueCount: 1, price: 1},
        {id: 'secondId', name: 'newValue2', valueCount: 22, price: 22},
        {id: 'thirdId', name: 'newValue3', valueCount: 333, price: 333},
    ]

    const endState = portfolioReducer(startState, setPortfolioAC(newState))

    expect(endState.length).toBe(3);
    expect(endState[0].name).toBe('newValue');
    expect(endState[2].valueCount).toBe(333);
});

test('correct value should be added to portfolio', () => {
    const startState: PortfolioType[] = []

    const newValue: PortfolioType = {id: 'id', name: 'newValue', valueCount: 1, price: 1}

    const endState = portfolioReducer(startState, addToPortfolioAC(newValue))

    expect(endState.length).toBe(1);
    expect(endState[0].name).toBe('newValue');
});

test('correct value should be removed from portfolio', () => {
    const startState: PortfolioType[] = [
        {id: 'firstId', name: 'newValue', valueCount: 1, price: 1},
        {id: 'secondId', name: 'newValue2', valueCount: 22, price: 22},
        {id: 'thirdId', name: 'newValue3', valueCount: 333, price: 333},
    ]

    const endState = portfolioReducer(startState, removeFromPortfolioAC('secondId'))

    expect(endState.length).toBe(2);
    expect(endState[0].name).toBe('newValue');
    expect(endState[1].name).toBe('newValue3');
});
