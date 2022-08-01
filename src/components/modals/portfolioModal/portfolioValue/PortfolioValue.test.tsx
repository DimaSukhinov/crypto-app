import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {PortfolioValue} from './PortfolioValue';
import {PortfolioType} from '../../../../store/portfolio-reducer';

describe('Portfolio value', () => {

    const portfolio: PortfolioType[] = [
        {id: 'bitcoin', name: 'Bitcoin', price: 2000, valueCount: 20},
        {id: 'ethereum', name: 'Ethereum', price: 2000, valueCount: 20},
    ]

    test('render portfolio value components', () => {
        render(
            <PortfolioValue portfolio={portfolio} removeValueFromPortfolio={jest.fn()}/>
        )

        expect(screen.getAllByTestId('portfolio-elem')).toHaveLength(2) // expected 2 items in the portfolio
        expect(screen.getAllByTestId('portfolio-elem')[0]).toHaveTextContent(portfolio[0].name) // bitcoin first element name expected
    });
})
