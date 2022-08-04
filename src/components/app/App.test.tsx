import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';
import { client } from '../../index';
import { ApolloProvider } from '@apollo/client';

describe('App', () => {

  test('renders header and values-page components', () => {
    render(<MemoryRouter initialEntries={['/', '/values']}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </MemoryRouter>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('values-page')).toBeInTheDocument();
    expect(screen.queryByTestId('value-page')).not.toBeInTheDocument();
  });

  test('error page test', () => {
    render(<MemoryRouter initialEntries={['/ghwwgtw']}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </MemoryRouter>);
    const errorPage = screen.getByTestId('error-page');
    expect(errorPage).toBeInTheDocument();
    expect(errorPage).toMatchSnapshot();
  });
});

