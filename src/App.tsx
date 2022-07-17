import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import './App.scss';
import {Header} from './components/header/Header';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Values} from './components/values/Values';
import {Value} from './components/values/value/Value';
import {cryptoAPI} from './api/api';
import {useAppSelector} from './store/store';
import {useDispatch} from 'react-redux';
import {setValuesAC} from './store/values-reducer';
import {setPortfolioAC} from './store/portfolio-reducer';

export const App = React.memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const values = useAppSelector((store) => store.values)

    const [value, setValue] = useState<string>('')
    const [valueCount, setValueCount] = useState<number>(0)
    const [currentValue, setCurrentValue] = useState<string>('')
    const [activeAddModal, setActiveAddModal] = useState<boolean>(false)

    const onValueCountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setValueCount(+e.currentTarget.value), [])

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
        navigate('valueId')
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
                           element={<Values valueCount={valueCount} onValueCountChange={onValueCountChange}
                                            values={values} navigateToValue={navigateToValue}
                                            setValueCount={setValueCount} currentValue={currentValue}
                                            activeAddModal={activeAddModal} setActiveAddModal={setActiveAddModal}
                                            setCurrentValue={setCurrentValue}/>}
                    />
                    <Route path={'/valueId'}
                           element={<Value values={values} value={value} navigateToValues={navigateToValues}
                                           valueCount={valueCount} onValueCountChange={onValueCountChange}
                                           setValueCount={setValueCount} currentValue={currentValue}
                                           activeAddModal={activeAddModal}
                                           setActiveAddModal={setActiveAddModal} setCurrentValue={setCurrentValue}/>}
                    />
                    <Route path={'/*'} element={<div>404</div>}/>
                </Routes>
            </div>
        </div>
    );
})
