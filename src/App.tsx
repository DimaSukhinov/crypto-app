import React, {useCallback, useEffect, useState} from 'react';
import './App.scss';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {Header} from './components/header/Header';
import {Values} from './components/values/Values';
import {Value} from './components/values/value/Value';
import {AddModal} from './components/modals/addModal/AddModal';
import {useDispatch} from 'react-redux';
import {setValuesTC, ValueType} from './store/values-reducer';
import {useAddModal} from './hooks/UseAddModal';
import {useAppSelector} from './hooks/CustomHooks';
import axios from 'axios';

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
        // @ts-ignore
        dispatch(setValuesTC(setValue))
    }, [])

    const navigateToValue = useCallback((id: string) => {
        navigate(`values/${id}`)
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
                           element={<Values values={values} navigateToValue={navigateToValue}
                                            openAddModal={openAddModal}/>}
                    />
                    <Route path={`/values/:id`}
                           element={<Value values={values} value={value} navigateToValues={navigateToValues}
                                           openAddModal={openAddModal}/>}
                    />
                    <Route path={'/*'} element={<div data-testid={'error-page'}>404</div>}/>
                </Routes>
            </div>
            <AddModal values={values} activeAddModal={activeAddModal} closeModal={closeModal}
                      currentValue={currentValue} valueCount={valueCount}
                      onValueCountChange={onValueCountChange} error={error} addToPortfolio={addToPortfolio}
            />
        </div>
    );
})
