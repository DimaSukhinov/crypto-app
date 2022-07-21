import React, {ChangeEvent, useCallback} from 'react';
import './AddModal.scss';
import {Modal} from '../Modal';
import {ValueType} from '../../../store/values-reducer';
import {addToPortfolioAC, PortfolioType} from '../../../store/portfolio-reducer';
import {useDispatch} from 'react-redux';

type AddModalPropsType = {
    values: ValueType[]
    activeAddModal: boolean
    currentValue: string
    valueCount: number
    error: boolean
    setError: (error: boolean) => void
    setValueCount: (valueCount: number) => void
    setActiveAddModal: (activeAddModal: boolean) => void
    onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const AddModal = React.memo(({
                                        values, activeAddModal, setActiveAddModal, error, onValueCountChange,
                                        setValueCount, currentValue, setError, valueCount
                                    }: AddModalPropsType) => {

    const dispatch = useDispatch()

    const addToPortfolio = useCallback((id: string, name: string, price: string, valueCount: number) => () => {
        if (valueCount > 0) {
            let value: PortfolioType = {id: id, name: name, price: +price, valueCount: valueCount}
            dispatch(addToPortfolioAC(value))
            setActiveAddModal(false)
            setValueCount(0)
        } else setError(true)
    }, [dispatch, setActiveAddModal, setError, setValueCount])

    return (
        <>
            {activeAddModal && <Modal setActive={setActiveAddModal}>
                {values.map(v => v.id === currentValue && <div className={'modal'}>
                    <span className={'modal__item'}>{v.name}</span>
                    <input type="number" onChange={onValueCountChange} className={'modal__item'}/>
                    {error && <div style={{color: 'red'}}>Incorrect value</div>}
                    <span className={'modal__item'}>
                         Price: {valueCount > 0 && (valueCount * +v.priceUsd).toFixed(2) + '$'}
                    </span>
                    <div onClick={addToPortfolio(v.id, v.name, v.priceUsd, valueCount)}
                         className={'modal__item values__add-button'}>Add
                    </div>
                </div>)}
            </Modal>}
        </>
    );
})
