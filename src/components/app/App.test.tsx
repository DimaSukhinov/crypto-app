import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {

  test('renders header and values-page components', () => {
    render(<MemoryRouter initialEntries={['/', '/values']}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('values-page')).toBeInTheDocument();
    expect(screen.queryByTestId('value-page')).not.toBeInTheDocument();
  });

  test('error page test', () => {
    render(<MemoryRouter initialEntries={['/ghwwgtw']}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>);
    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();
    expect(errorPage).toMatchSnapshot();
  });
});

