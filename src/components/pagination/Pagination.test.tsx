import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {store} from '../../store/store';
import {Pagination} from './Pagination';

describe('Pagination', () => {

    test('pagination components render', () => {
        render(<MemoryRouter>
            <Provider store={store}>
                <Pagination totalValues={100} currentPage={1} valuesPerPage={14} changeCurrentPage={() => {}}/>
            </Provider>
        </MemoryRouter>)

        expect(screen.getByTestId('pagination')).toBeInTheDocument()
        expect(screen.getByTestId('pagination')).toMatchSnapshot()

        expect(screen.getAllByTestId('pagination-elem')).toHaveLength(8)
        expect(screen.getByText(1)).toBeInTheDocument() // expected number 1 on the page
        expect(screen.getByText(8)).toBeInTheDocument() // expected number 8 on the page
    });
})
