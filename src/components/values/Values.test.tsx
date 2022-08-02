import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Values } from './Values';

test('values components render', async () => {
  render(
    <Values values={[]} openAddModal={jest.fn()} navigateToValue={jest.fn()} />,
  );

  expect(screen.getByTestId('values-list')).toBeInTheDocument();
  expect(screen.getByTestId('pagination')).toBeInTheDocument();
  expect(screen.getByTestId('values-page')).toMatchSnapshot();
});
