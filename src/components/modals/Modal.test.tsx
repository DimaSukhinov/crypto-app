import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Modal } from './Modal';

test('modal', () => {
  render(<Modal closeModal={jest.fn()} children={<div>Modal</div>} />);

  expect(screen.getByText(/modal/i)).toBeInTheDocument();
  expect(screen.getByTestId('space-around-modal')).toMatchSnapshot();
});
