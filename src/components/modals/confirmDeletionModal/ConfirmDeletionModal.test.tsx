import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {store} from '../../../store/store';
import {ConfirmDeletionModal} from './ConfirmDeletionModal';

describe('Confirm deletion modal', () => {

    test('elements are render', () => {
        render(<MemoryRouter>
            <Provider store={store}>
                <ConfirmDeletionModal valueForDelete={'bitcoin'} confirm={() => {}} reject={() => {}}/>
            </Provider>
        </MemoryRouter>)

        expect(screen.getByTestId('confirm-deletion-modal')).toBeInTheDocument()
        expect(screen.getByTestId('confirm-deletion-modal')).toMatchSnapshot()

        expect(screen.getByText(/do you really want to delete/i)).toBeInTheDocument()
        expect(screen.getByText(/yes/i)).toBeInTheDocument()
        expect(screen.getByText(/no/i)).toBeInTheDocument()
    });
})
