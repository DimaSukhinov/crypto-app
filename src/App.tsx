import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import './App.scss';
import {Header} from './components/header/Header';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Values} from './components/values/Values';
import {Value} from './components/values/value/Value';
import {cryptoAPI} from './api/api';
import {useDispatch} from 'react-redux';
import {setValuesAC} from './store/values-reducer';
import {setPortfolioAC} from './store/portfolio-reducer';
import {useAppSelector} from './customHooks/CustomHooks';

export const App = React.memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const values = useAppSelector((store) => store.values)

    const [value, setValue] = useState<string>('')
    const [valueCount, setValueCount] = useState<number>(0)
    const [currentValue, setCurrentValue] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [activeAddModal, setActiveAddModal] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const onValueCountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValueCount(+e.currentTarget.value)
        setError(false)
    }, [])

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

        let page = sessionStorage.getItem('page')
        if (page) {
            let newValue = JSON.parse(page)
            setCurrentPage(newValue)
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
                           element={<Values valueCount={valueCount} onValueCountChange={onValueCountChange}
                                            values={values} navigateToValue={navigateToValue}
                                            setValueCount={setValueCount} currentValue={currentValue}
                                            activeAddModal={activeAddModal} setActiveAddModal={setActiveAddModal}
                                            setCurrentValue={setCurrentValue} error={error} setError={setError}
                                            setCurrentPage={setCurrentPage} currentPage={currentPage}/>}
                    />
                    <Route path={'/value'}
                           element={<Value values={values} value={value} navigateToValues={navigateToValues}
                                           valueCount={valueCount} onValueCountChange={onValueCountChange}
                                           setValueCount={setValueCount} currentValue={currentValue}
                                           activeAddModal={activeAddModal}
                                           setActiveAddModal={setActiveAddModal} setCurrentValue={setCurrentValue}
                                           error={error} setError={setError}/>}
                    />
                    <Route path={'/*'} element={<div>404</div>}/>
                </Routes>
            </div>
        </div>
    );
})
