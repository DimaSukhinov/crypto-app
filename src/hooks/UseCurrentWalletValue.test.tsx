import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useCurrentWalletValue } from './UseCurrentWalletValue';
import { portfolio, values } from '../store/TestStore';

const currentWalletValue = useCurrentWalletValue(portfolio, values);

test('renders wallet value', () => {
  render(
    currentWalletValue,
  );

  expect(screen.getByText(/usd/i)).toBeInTheDocument();
  expect(screen.getByText(/usd/i)).toMatchSnapshot();
  expect(screen.getByText(/%/i)).toHaveStyle({ color: '#0abd0a' });
});
