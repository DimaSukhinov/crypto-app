import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {Header} from './components/header/Header';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Values} from './components/values/Values';
import {Value} from './components/values/value/Value';
import {cryptoAPI} from './api/api';
import {useDispatch} from 'react-redux';
import {setValuesAC} from './store/values-reducer';
import {setPortfolioAC} from './store/portfolio-reducer';
import {useAppSelector} from './hooks/CustomHooks';
import {AddModal} from './components/modals/addModal/AddModal';

export const App = React.memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const values = useAppSelector((store) => store.values)

    const [value, setValue] = useState<string>('')

    useEffect(() => {
        cryptoAPI.allValues().then((data) => {
            dispatch(setValuesAC(data.data.data))
        })

        let portfolio = localStorage.getItem('portfolio')
        if (portfolio !== null) {
            dispatch(setPortfolioAC(JSON.parse(portfolio)))
        }

        let value = sessionStorage.getItem('value')
        if (value) {
            let newValue = JSON.parse(value)
            setValue(newValue)
        }
    }, [])

    const navigateToValue = useCallback((id: string) => {
        navigate('value')
        setValue(id)
        sessionStorage.setItem('value', JSON.stringify(id))
    }, [navigate])

    const navigateToValues = useCallback(() => {
        navigate('values')
        sessionStorage.setItem('value', JSON.stringify(''))
    }, [navigate])

    return (
        <div className={'app'}>
            <Header values={values}/>
            <div className={'app__main'}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/values'}/>}/>
                    <Route path={'/values'}
                           element={<Values values={values} navigateToValue={navigateToValue}/>}
                    />
                    <Route path={'/value'}
                           element={<Value values={values} value={value} navigateToValues={navigateToValues}/>}
                    />
                    <Route path={'/*'} element={<div>404</div>}/>
                </Routes>
            </div>
            <AddModal values={values}/>
        </div>
    );
})
