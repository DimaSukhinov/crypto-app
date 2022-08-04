import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { AddModal } from './AddModal';

describe('Add modal', () => {

  const value = {
    id: 'bitcoin', rank: '1', changePercent24Hr: '3.1367184772434482', explorer: 'https://blockchain.info/',
    marketCapUsd: '452445368357.8622563021714334', maxSupply: '21000000.0000000000000000', name: 'Bitcoin',
    priceUsd: '23679.9797033025578357', supply: '19106662.0000000000000000', symbol: 'BTC',
    volumeUsd24Hr: '17521511686.5773940471774064', vwap24Hr: '23710.9068155355389843',
  };
  const currentValue = 'bitcoin';

  test('without error', () => {
    render(
      <AddModal closeModal={jest.fn()} values={[value]} activeAddModal={true} valueCount={0} error={false}
                addToPortfolio={jest.fn()} onValueCountChange={jest.fn()} currentValue={currentValue}
      />,
    );

    expect(screen.getByTestId('add-modal')).toBeInTheDocument();
    expect(screen.getByTestId('add-modal')).toMatchSnapshot();

    expect(screen.getByText(/price/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
    expect(screen.queryByText(/incorrect value/i)).not.toBeInTheDocument();
  });

  test('with error', () => {
    render(
      <AddModal closeModal={jest.fn()} values={[value]} activeAddModal={true} currentValue={currentValue}
                addToPortfolio={jest.fn()} error={true} onValueCountChange={jest.fn()} valueCount={0}
      />,
    );

    expect(screen.getByTestId('add-modal')).toBeInTheDocument();
    expect(screen.getByTestId('add-modal')).toMatchSnapshot();

    expect(screen.getByText(/min 0.1, max 1000/i)).toBeInTheDocument();
    expect(screen.getByText(/min 0.1, max 1000/i)).toHaveStyle({ color: 'red' });
  });
});
