import React, {ChangeEvent, useCallback} from 'react';
import './AddModal.scss';
import {Modal} from '../Modal';
import {ValueType} from '../../../store/values-reducer';
import {addToPortfolioAC, PortfolioType} from '../../../store/portfolio-reducer';
import {useDispatch} from 'react-redux';
import {Button} from '../../common/button/Button';
import {useOpenAddModal} from '../../../hooks/UseOpenAddModal';

type AddModalPropsType = {
    values: ValueType[]
}

export const AddModal = React.memo(({values}: AddModalPropsType) => {

    const dispatch = useDispatch()
    const {
        setValueCount, setActiveAddModal, setError,
        activeAddModal, valueCount, error, currentValue
    } = useOpenAddModal()

    const onValueCountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValueCount(+e.currentTarget.value)
        setError(false)
    }, [setError, setValueCount])

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
                    <Button onClickHandler={addToPortfolio(v.id, v.name, v.priceUsd, valueCount)}>
                        Add
                    </Button>
                </div>)}
            </Modal>}
        </>
    );
})
