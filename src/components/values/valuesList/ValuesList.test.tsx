import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {store} from '../../../store/store';
import {ValuesList} from './ValuesList';

describe('Values list', () => {

    const values = [
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

    test('renders values list components', () => {
        render(<MemoryRouter>
            <Provider store={store}>
                <ValuesList navigateToValue={() => {}} currentPageValues={values} openAddModal={() => {}}/>
            </Provider>
        </MemoryRouter>)

        expect(screen.getByTestId('values-list')).toBeInTheDocument()
        expect(screen.getByTestId('values-list')).toMatchSnapshot()

        expect(screen.getAllByTestId('value-list-elem')).toHaveLength(2)
    });

    test('testing add button', () => {
        render(<MemoryRouter>
            <Provider store={store}>
                <ValuesList navigateToValue={() => {}} currentPageValues={values} openAddModal={() => {}}/>
            </Provider>
        </MemoryRouter>)


    });

    // test('portfolio opened', () => {
    //     render(<MemoryRouter>
    //         <Provider store={store}>
    //             <Header values={[]}/>
    //         </Provider>
    //     </MemoryRouter>)
    //
    //     const button = screen.getByTestId('portfolio-button')
    //
    //     expect(screen.getByTestId('header')).toBeInTheDocument() // expected header component
    //
    //     expect(button).toBeInTheDocument() // expected button to open portfolio
    //     expect(screen.queryByTestId('portfolio-modal')).not.toBeInTheDocument() // no portfolio modal expected
    //     userEvent.click(button) // click open portfolio button
    //     expect(screen.getByTestId('portfolio-modal')).toBeInTheDocument() // expected portfolio modal
    //     userEvent.click(screen.getByTestId('space-around-modal')) // click on free space to close the portfolio modal
    //     expect(screen.queryByTestId('portfolio-modal')).not.toBeInTheDocument() // no portfolio modal expected
    // });
})
