import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {Header} from './components/header/Header';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Values} from './components/values/Values';
import {Value} from './components/values/value/Value';
import {cryptoAPI} from './api/api';
import {useAppSelector} from './store/store';
import {useDispatch} from 'react-redux';
import {setValuesAC} from './store/values-reducer';

export const App = React.memo(() => {

    const dispatch = useDispatch()
    const values = useAppSelector((store) => store.values)

    useEffect(() => {
        cryptoAPI.allValues().then((data) => {
            dispatch(setValuesAC(data.data.data))
        })
    }, [])

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
