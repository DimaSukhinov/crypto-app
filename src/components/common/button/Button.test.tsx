import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Button } from './Button';

test('button', () => {
  render(<Button children={'Add'} onClickHandler={jest.fn()} backgroundColor={'#fff'} color={'#000'} />);

  expect(screen.getByText(/add/i)).toBeInTheDocument();
  expect(screen.getByText(/add/i)).toMatchSnapshot();
  expect(screen.getByText(/add/i)).toHaveStyle({ backgroundColor: '#fff', color: '#000' });
});

