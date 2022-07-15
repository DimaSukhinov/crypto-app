import React, {useCallback, useState} from 'react';
import './App.scss';
import {Header} from './components/header/Header';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Values} from './components/values/Values';
import {Value} from './components/values/value/Value';

export type ValuesType = {
    id: string
    rank: string
    symbol: string
    name: string
    supply: string
    maxSupply: string | null
    marketCapUsd: string
    volumeUsd24Hr: string
    priceUsd: string
    changePercent24Hr: string
    vwap24Hr: string
    explorer: string
}

export const App = React.memo(() => {

    const values: ValuesType[] = [
        {
            'id': 'bitcoin',
            'rank': '1',
            'symbol': 'BTC',
            'name': 'Bitcoin',
            'supply': '19094293.0000000000000000',
            'maxSupply': '21000000.0000000000000000',
            'marketCapUsd': '399426885179.8088303852842094',
            'volumeUsd24Hr': '11837895849.9925799052814276',
            'priceUsd': '20918.6527712656776758',
            'changePercent24Hr': '4.1799588234800279',
            'vwap24Hr': '20637.6097978288072828',
            'explorer': 'https://blockchain.info/'
        },
        {
            'id': 'ethereum',
            'rank': '2',
            'symbol': 'ETH',
            'name': 'Ethereum',
            'supply': '121557416.4990000000000000',
            'maxSupply': null,
            'marketCapUsd': '149711408752.8469978793659856',
            'volumeUsd24Hr': '9604275255.3909128356258441',
            'priceUsd': '1231.6106500509461595',
            'changePercent24Hr': '11.2565855749404513',
            'vwap24Hr': '1190.4525151089703446',
            'explorer': 'https://etherscan.io/'
        },
        {
            'id': 'tether',
            'rank': '3',
            'symbol': 'USDT',
            'name': 'Tether',
            'supply': '65876317670.4762400000000000',
            'maxSupply': null,
            'marketCapUsd': '65818128212.0390576882943884',
            'volumeUsd24Hr': '22455724285.1116747274444786',
            'priceUsd': '0.9991166862311847',
            'changePercent24Hr': '0.0319380387870279',
            'vwap24Hr': '0.9992572406455138',
            'explorer': 'https://www.omniexplorer.info/asset/31'
        },
    ]

    const navigate = useNavigate()
    const [value, setValue] = useState<string>('')

    const navigateToValue = useCallback((id: string) => {
        navigate('valueId')
        setValue(id)
    }, [navigate])

    const navigateToValues = useCallback(() => navigate('values'), [navigate])

    return (
        <div className={'app'}>
            <Header/>
            <div className={'app__main'}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/values'}/>}/>
                    <Route path={'/values'} element={<Values values={values} navigateToValue={navigateToValue}/>}/>
                    <Route path={'/valueId'}
                           element={<Value values={values} value={value} navigateToValues={navigateToValues}/>}/>
                    <Route path={'/*'} element={<div>404</div>}/>
                </Routes>
            </div>
        </div>
    );
})
