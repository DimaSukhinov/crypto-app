import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {ValuesList} from './ValuesList';
import {values} from '../../../store/TestStore';

test('renders values list components', () => {
    render(
        <ValuesList navigateToValue={jest.fn()} currentPageValues={values} openAddModal={jest.fn()}/>
    )

    expect(screen.getByTestId('values-list')).toBeInTheDocument()
    expect(screen.getByTestId('values-list')).toMatchSnapshot()

    const valueElem = screen.getAllByTestId('value-list-elem')

    expect(valueElem).toHaveLength(2) // expect render of 2 values
    expect(valueElem[0]).toHaveTextContent(values[0].name)
});
