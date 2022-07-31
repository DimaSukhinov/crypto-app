import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {store} from '../../store/store';
import {Values} from './Values';

describe('Values', () => {

    test('values components render', async () => {
        render(<MemoryRouter>
            <Provider store={store}>
                <Values values={[]} openAddModal={() => {}} navigateToValue={() => {}}/>
            </Provider>
        </MemoryRouter>)

        expect(screen.getByTestId('values-list')).toBeInTheDocument()
        expect(screen.getByTestId('pagination')).toBeInTheDocument()
        expect(screen.getByTestId('values-page')).toMatchSnapshot()
    });
})
