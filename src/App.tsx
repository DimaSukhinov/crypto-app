import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Header} from './components/header/Header';
import {Values} from './components/values/Values';
import {Value} from './components/values/value/Value';
import {AddModal} from './components/modals/addModal/AddModal';
import {cryptoAPI} from './api/api';
import {useDispatch} from 'react-redux';
import {setValuesAC} from './store/values-reducer';
import {setPortfolioAC} from './store/portfolio-reducer';
import {useAppSelector} from './hooks/CustomHooks';
import {useAddModal} from './hooks/UseAddModal';
import {MaterialHeader} from './components/header/MaterialHeader';
import {MaterialValues} from './components/values/MaterialValues';
import {MaterialValue} from './components/values/value/MaterialValue';
import {MaterialAddModal} from './components/modals/addModal/MaterialAddModal';

export const App = React.memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const values = useAppSelector((store) => store.values)

    const [currentValue, setCurrentValue] = useState<string>('')
    const [valueCount, setValueCount] = useState<number>(0)
    const [activeAddModal, setActiveAddModal] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const {
        openAddModal, closeModal, onValueCountChange, addToPortfolio
    } = useAddModal(setActiveAddModal, setCurrentValue, setError, setValueCount)

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
            <MaterialHeader values={values}/>
            <div className={'app__main'}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/values'}/>}/>
                    <Route path={'/values'}
                           element={<MaterialValues values={values} navigateToValue={navigateToValue}
                                                    openAddModal={openAddModal}/>}
                    />
                    <Route path={'/value'}
                           element={<MaterialValue values={values} value={value} navigateToValues={navigateToValues}
                                                   openAddModal={openAddModal}/>}
                    />
                    <Route path={'/*'} element={<>404</>}/>
                </Routes>
            </div>
            <MaterialAddModal values={values} activeAddModal={activeAddModal} closeModal={closeModal}
                      currentValue={currentValue} valueCount={valueCount}
                      onValueCountChange={onValueCountChange} error={error} addToPortfolio={addToPortfolio}
            />
        </div>
    );
})
