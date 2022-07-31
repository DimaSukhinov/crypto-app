import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {store} from '../../../store/store';
import {PortfolioModal} from './PortfolioModal';
import {useCurrentWalletValue} from '../../../hooks/UseCurrentWalletValue';

describe('Portfolio modal', () => {

    test('empty portfolio', () => {

        const currentWalletValue = useCurrentWalletValue([], [])

        render(<MemoryRouter>
            <Provider store={store}>
                <PortfolioModal setActivePortfolioModal={() => {}} activePortfolioModal={true}
                                currentWalletValue={currentWalletValue}/>
            </Provider>
        </MemoryRouter>)

        expect(screen.getByTestId('portfolio-modal')).toBeInTheDocument() // portfolio modal expected
        expect(screen.getByText(/you don't have currency/i)).toBeInTheDocument()
    });

    test('not empty portfolio', () => {

        // const currentWalletValue = useCurrentWalletValue([], [])
        //
        // render(<MemoryRouter>
        //     <Provider store={store}>
        //         <PortfolioModal setActivePortfolioModal={() => {}} activePortfolioModal={true}
        //                         currentWalletValue={currentWalletValue}/>
        //     </Provider>
        // </MemoryRouter>)
        //
        // expect(screen.getByTestId('portfolio-modal')).toBeInTheDocument() // portfolio modal expected
        // expect(screen.getByText(/you don't have currency/i)).toBeInTheDocument()
    });
})
