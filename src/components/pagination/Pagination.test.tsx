import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Pagination } from './Pagination';

test('pagination components render', () => {
  render(
    <Pagination totalValues={100} currentPage={1} valuesPerPage={14} changeCurrentPage={jest.fn()} />,
  );

  expect(screen.getByTestId('pagination')).toBeInTheDocument();
  expect(screen.getByTestId('pagination')).toMatchSnapshot();

  expect(screen.getAllByTestId('pagination-elem')).toHaveLength(8);
  expect(screen.getByText(1)).toBeInTheDocument(); // expected number 1 on the page
  expect(screen.getByText(8)).toBeInTheDocument(); // expected number 8 on the page
});
