import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import {store} from '../../../store/store';
import {PortfolioModal} from './PortfolioModal';
import {useCurrentWalletValue} from '../../../hooks/UseCurrentWalletValue';
import {portfolio, testStore, values} from '../../../store/TestStore';
import userEvent from '@testing-library/user-event';

describe('Portfolio modal', () => {

    test('empty portfolio', () => {
        const currentWalletValue = useCurrentWalletValue([], [])
        render(
            <Provider store={store}>
                <PortfolioModal setActivePortfolioModal={jest.fn()} activePortfolioModal={true}
                                currentWalletValue={currentWalletValue}/>
            </Provider>
        )

        expect(screen.getByTestId('portfolio-modal')).toBeInTheDocument() // portfolio modal expected
        expect(screen.getByTestId('portfolio-modal')).toMatchSnapshot()
        expect(screen.getByText(/you don't have currency/i)).toBeInTheDocument()
    });

    test('not empty portfolio', () => {
        const currentWalletValue = useCurrentWalletValue(portfolio, values)
        render(
            <Provider store={testStore}>
                <PortfolioModal setActivePortfolioModal={jest.fn()} activePortfolioModal={true}
                                currentWalletValue={currentWalletValue}/>
            </Provider>
        )

        const portfolioElem = screen.getAllByTestId('portfolio-elem')

        expect(screen.getByTestId('portfolio-modal')).toBeInTheDocument() // portfolio modal expected
        expect(screen.getByTestId('portfolio-modal')).toMatchSnapshot()

        expect(screen.queryByText(/you don't have currency/i)).not.toBeInTheDocument()
        expect(screen.getByText(/current price/i)).toBeInTheDocument()
        expect(portfolioElem).toHaveLength(2)
    });

    test('expect confirmation window not open', () => {
        const currentWalletValue = useCurrentWalletValue(portfolio, values)
        render(
            <Provider store={testStore}>
                <PortfolioModal setActivePortfolioModal={jest.fn()} activePortfolioModal={true}
                                currentWalletValue={currentWalletValue}/>
            </Provider>
        )

        expect(screen.getByTestId('portfolio-modal')).toBeInTheDocument() // portfolio modal expected
        expect(screen.getAllByTestId('portfolio-elem')).toHaveLength(2)

        expect(screen.queryByTestId('confirm-deletion-modal')).not.toBeInTheDocument()
    });

    test('expect that the confirmation window is open and closes by clicking on the button', () => {
        const currentWalletValue = useCurrentWalletValue(portfolio, values)
        render(
            <Provider store={testStore}>
                <PortfolioModal setActivePortfolioModal={jest.fn()} activePortfolioModal={true}
                                currentWalletValue={currentWalletValue}/>
            </Provider>
        )

        expect(screen.getByTestId('portfolio-modal')).toBeInTheDocument() // portfolio modal expected
        expect(screen.getAllByTestId('portfolio-elem')).toHaveLength(2) // expected 2 values in the portfolio

        userEvent.click(screen.getAllByText('-')[0]) // clicking on the delete button of the first element

        expect(screen.getByTestId('confirm-deletion-modal')).toBeInTheDocument() // confirm deletion modal expected

        userEvent.click(screen.getByText(/no/i)) // click on the button do not delete

        expect(screen.queryByTestId('confirm-deletion-modal')).not.toBeInTheDocument() // confirm deletion modal no expected
        expect(screen.getAllByTestId('portfolio-elem')).toHaveLength(2) // expected 2 values in the portfolio
    });
})
