import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { Header } from './Header';
import userEvent from '@testing-library/user-event';
import { testStore, values } from '../../store/TestStore';

describe('Header', () => {

  test('renders current price', () => {
    render(
      <Provider store={testStore}>
        <Header values={values} />
      </Provider>,
    );

    expect(screen.getByText(/usd/i)).toBeInTheDocument(); // expected that price rendered
    expect(screen.getAllByText(/btc/i)[0]).toBeInTheDocument();
  });

  test('portfolio opened', () => {
    render(
      <Provider store={testStore}>
        <Header values={values} />
      </Provider>,
    );

    const button = screen.getByTestId('portfolio-button');

    expect(screen.getByTestId('header')).toBeInTheDocument(); // expected header component

    expect(button).toBeInTheDocument(); // expected button to open portfolio
    expect(screen.queryByTestId('portfolio-modal')).not.toBeInTheDocument(); // no portfolio modal expected
    userEvent.click(button); // click open portfolio button
    expect(screen.getByTestId('portfolio-modal')).toBeInTheDocument(); // expected portfolio modal
    userEvent.click(screen.getByTestId('space-around-modal')); // click on free space to close the portfolio modal
    expect(screen.queryByTestId('portfolio-modal')).not.toBeInTheDocument(); // no portfolio modal expected
  });
});
