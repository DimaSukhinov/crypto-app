import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Value } from './Value';
import { values } from '../../../store/TestStore';

test('renders value components', () => {
  render(
    <Value values={values} value={'bitcoin'} openAddModal={jest.fn()} navigateToValues={jest.fn()} />,
  );

  expect(screen.getByTestId('value-page')).toMatchSnapshot();
  expect(screen.getByText(/bitcoin/i)).toBeInTheDocument();
  expect(screen.getByText(/24Hr/i)).toBeInTheDocument();
  expect(screen.getByText(/48Hr/i)).toBeInTheDocument();
  expect(screen.getByText(/%/i)).toHaveStyle({ color: 'green' });
});
