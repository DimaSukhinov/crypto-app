import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {AddModal} from './AddModal';
import {Provider} from 'react-redux';
import {store} from '../../../store/store';
import {MemoryRouter} from 'react-router-dom';

describe('Add modal', () => {

    const value = {
        id: 'bitcoin', rank: '1', changePercent24Hr: '3.1367184772434482', explorer: 'https://blockchain.info/',
        marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Bitcoin',
        priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
        volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843'
    }
    const currentValue = 'bitcoin'

    test('without error', () => {
        render(<MemoryRouter>
            <Provider store={store}>
                <AddModal closeModal={() => {}} values={[value]} activeAddModal={true} valueCount={0}
                          addToPortfolio={(id: string, name: string, price: string, valueCount: number) => () => {}}
                          error={false} onValueCountChange={() => {}} currentValue={currentValue}/>
            </Provider>
        </MemoryRouter>)

        expect(screen.getByTestId('add-modal')).toBeInTheDocument()
        expect(screen.getByTestId('add-modal')).toMatchSnapshot()

        expect(screen.getByText(/price/i)).toBeInTheDocument()
        expect(screen.getByText(/add/i)).toBeInTheDocument()
        expect(screen.queryByText(/incorrect value/i)).not.toBeInTheDocument()
    });

    test('with error', () => {
        render(<MemoryRouter>
            <Provider store={store}>
                <AddModal closeModal={() => {}} values={[value]} activeAddModal={true} valueCount={0}
                          addToPortfolio={(id: string, name: string, price: string, valueCount: number) => () => {}}
                          error={true} onValueCountChange={() => {}} currentValue={currentValue}/>
            </Provider>
        </MemoryRouter>)

        expect(screen.getByTestId('add-modal')).toBeInTheDocument()
        expect(screen.getByTestId('add-modal')).toMatchSnapshot()

        expect(screen.getByText(/incorrect value/i)).toBeInTheDocument()
        expect(screen.getByText(/incorrect value/i)).toHaveStyle({color: 'red'})
    });
})


