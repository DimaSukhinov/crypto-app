import React, {ChangeEvent, useCallback, useState} from 'react';
import './Values.scss';
import {ValueType} from '../../store/values-reducer';
import {useDispatch} from 'react-redux';
import {addToPortfolioAC} from '../../store/portfolio-reducer';
import {Modal} from '../modal/Modal';
import {Pagination} from '../pagination/Pagination';

type ValueListPropsType = {
    values: ValueType[]
    navigateToValue: (id: string) => void
    valueCount: number
    setValueCount: (valueCount: number) => void
    onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Values = React.memo((props: ValueListPropsType) => {

    const dispatch = useDispatch()
    const [currentValue, setCurrentValue] = useState<string>('')
    const [activeAddModal, setActiveAddModal] = useState<boolean>(false)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const valuesPerPage: number = 14
    const totalValues: number = props.values.length

    const lastValueIndex = currentPage * valuesPerPage
    const firstValueIndex = lastValueIndex - valuesPerPage
    const currentPageValues = props.values.slice(firstValueIndex, lastValueIndex)

    const changeCurrentPage = useCallback((page: number) => setCurrentPage(page), [])

    const openValuePage = useCallback((id: string) => () => props.navigateToValue(id), [props])
    const openAddModal = useCallback((id: string) => (e: any) => {
        e.stopPropagation()
        setActiveAddModal(true)
        setCurrentValue(id)
    }, [])

    const addToPortfolio = useCallback((id: string, name: string, price: string, valueCount: number) => () => {
        dispatch(addToPortfolioAC(id, name, +price, valueCount))
        setActiveAddModal(false)
        props.setValueCount(0)
    }, [dispatch, props])

    return (
        <div className="valueList">
            <div className={'valueList__header'}>
                <span>Rank</span>
                <span>Symbol</span>
                <span>Name</span>
                <span>Price $</span>
                <span>Changes</span>
                <span>Add to portfolio</span>
            </div>
            {currentPageValues.map(v => <div className={'valueList__value'} onClick={openValuePage(v.id)}>
                <div className={'valueList__rank'}>
                    {v.rank}
                </div>
                <div className={'valueList__symbol'}>
                    {v.symbol}
                </div>
                <div className={'valueList__name'}>
                    {v.name}
                </div>
                <div className={'valueList__price'}>
                    {+(+v.priceUsd).toFixed(2)} $
                </div>
                <div className={'valueList__changePercent'} style={{color: +v.changePercent24Hr > 0 ? 'green' : 'red'}}>
                    {+(+v.changePercent24Hr).toFixed(2)}%
                </div>
                <div className={'valueList__add'} onClick={openAddModal(v.id)}>
                    Add
                </div>
            </div>)}
            {activeAddModal && <Modal active={activeAddModal} setActive={setActiveAddModal}>
                {props.values.map(v => v.id === currentValue && <div className={'valueList__modal'}>
                    <span className={'valueList__modal-item'}>{v.name}</span>
                    <input type="number" onChange={props.onValueCountChange} className={'valueList__modal-item'}/>
                    <span className={'valueList__modal-item'}>
                        Price: {(props.valueCount * +v.priceUsd).toFixed(2)} $
                    </span>
                    <div onClick={addToPortfolio(v.id, v.name, v.priceUsd, props.valueCount)}
                         className={'valueList__modal-item valueList__add'}>Add
                    </div>
                </div>)}
            </Modal>}
            <Pagination valuesPerPage={valuesPerPage} totalValues={totalValues} changeCurrentPage={changeCurrentPage}
                        currentPage={currentPage}/>
        </div>
    );
})
