import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {App} from './App';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {MemoryRouter} from 'react-router-dom';
import axios from 'axios';
import {ValueType} from './store/values-reducer';
import {getData} from './api/GetData.test';

jest.mock('axios')

describe('App', () => {

    test('renders header and values-page components', () => {
        render(<MemoryRouter initialEntries={['/', '/values']}>
            <Provider store={store}>
                <App/>
            </Provider>
        </MemoryRouter>)
        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('values-page')).toBeInTheDocument()
        expect(screen.queryByTestId('value-page')).not.toBeInTheDocument()
    });

    test('error page test', () => {
        render(<MemoryRouter initialEntries={['/ghwwgtw']}>
            <Provider store={store}>
                <App/>
            </Provider>
        </MemoryRouter>)
        const errorPage = screen.getByTestId('error-page')
        expect(errorPage).toBeInTheDocument()
        expect(errorPage).toMatchSnapshot()
    });
})


describe('app 2', () => {

    let response: { data: ValueType[] }
    beforeEach(() => {
        response = {
            data: [
                {
                    'id': 'bitcoin',
                    'rank': '1',
                    'symbol': 'BTC',
                    'name': 'Bitcoin',
                    'supply': '19108443.0000000000000000',
                    'maxSupply': '21000000.0000000000000000',
                    'marketCapUsd': '453181731348.6797454346446045',
                    'volumeUsd24Hr': '9587909973.6990882128777007',
                    'priceUsd': '23716.3086154470955815',
                    'changePercent24Hr': '-3.1603179747611418',
                    'vwap24Hr': '24182.8765631019632951',
                    'explorer': 'https://blockchain.info/'
                },
                {
                    'id': 'ethereum',
                    'rank': '2',
                    'symbol': 'ETH',
                    'name': 'Ethereum',
                    'supply': '121772296.4990000000000000',
                    'maxSupply': null,
                    'marketCapUsd': '208058437039.2600633392062010',
                    'volumeUsd24Hr': '5898356396.5436857253778269',
                    'priceUsd': '1708.5859675888484973',
                    'changePercent24Hr': '-1.0845488622105411',
                    'vwap24Hr': '1710.5773399113687586',
                    'explorer': 'https://etherscan.io/'
                },
                {
                    'id': 'tether',
                    'rank': '3',
                    'symbol': 'USDT',
                    'name': 'Tether',
                    'supply': '66197977707.8578950000000000',
                    'maxSupply': null,
                    'marketCapUsd': '66178116126.3188630227438663',
                    'volumeUsd24Hr': '20555464109.1871151421013852',
                    'priceUsd': '0.9996999669442066',
                    'changePercent24Hr': '-0.0199617508204188',
                    'vwap24Hr': '1.0004127405352286',
                    'explorer': 'https://www.omniexplorer.info/asset/31'
                },
            ]
        }
    })

    test('renders header and value-page components', async () => {

        (axios.create as jest.Mock).mockReturnValue(response)
        const data = await getData()
        expect(axios.get).toBeCalledTimes(1)
        expect(data).toEqual(['bitcoin', 'ethereum', 'tether'])

        // render(<MemoryRouter initialEntries={[`/value/`]}>
        //     <Provider store={store}>
        //         <App/>
        //     </Provider>
        // </MemoryRouter>)
        // expect(screen.getByTestId('header')).toBeInTheDocument()
        // expect(screen.getByTestId('value-page')).toBeInTheDocument()
        // expect(screen.queryByTestId('values-page')).not.toBeInTheDocument()
    });
})
