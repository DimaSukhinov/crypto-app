import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ConfirmDeletionModal } from './ConfirmDeletionModal';

test('confirm deletion elements are render', () => {
  render(
    <ConfirmDeletionModal valueForDelete={'bitcoin'} confirm={jest.fn()} reject={jest.fn()} />,
  );

  expect(screen.getByTestId('confirm-deletion-modal')).toBeInTheDocument();
  expect(screen.getByTestId('confirm-deletion-modal')).toMatchSnapshot();

  expect(screen.getByText(/do you really want to delete/i)).toBeInTheDocument();
  expect(screen.getByText(/yes/i)).toBeInTheDocument();
  expect(screen.getByText(/no/i)).toBeInTheDocument();
});
