import React, {ChangeEvent, useCallback} from 'react';
import './AddModal.scss';
import {Modal} from '../Modal';
import {ValueType} from '../../../store/values-reducer';
import {addToPortfolioAC} from '../../../store/portfolio-reducer';
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

export const AddModal = React.memo((props: AddModalPropsType) => {

    const dispatch = useDispatch()

    const addToPortfolio = useCallback((id: string, name: string, price: string, valueCount: number) => () => {
        if (valueCount > 0) {
            dispatch(addToPortfolioAC(id, name, +price, valueCount))
            props.setActiveAddModal(false)
            props.setValueCount(0)
        } else props.setError(true)
    }, [dispatch, props])

    return (
        <>
            {props.activeAddModal && <Modal active={props.activeAddModal} setActive={props.setActiveAddModal}>
                {props.values.map(v => v.id === props.currentValue && <div className={'modal'}>
                    <span className={'modal__item'}>{v.name}</span>
                    <input type="number" onChange={props.onValueCountChange} className={'modal__item'}/>
                    {props.error && <div style={{color: 'red'}}>Incorrect value</div>}
                    <span className={'modal__item'}>
                         Price: {props.valueCount > 0 && (props.valueCount * +v.priceUsd).toFixed(2) + '$'}
                    </span>
                    <div onClick={addToPortfolio(v.id, v.name, v.priceUsd, props.valueCount)}
                         className={'modal__item values__value-add'}>Add
                    </div>
                </div>)}
            </Modal>}
        </>
    );
})
