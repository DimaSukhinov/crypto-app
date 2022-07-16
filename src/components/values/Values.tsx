import React, {ChangeEvent, useCallback, useState} from 'react';
import './Values.scss';
import {ValueType} from '../../store/values-reducer';
import {Pagination} from '../pagination/Pagination';
import {AddModal} from '../modal/addModal/AddModal';

type ValueListPropsType = {
    values: ValueType[]
    navigateToValue: (id: string) => void
    valueCount: number
    currentValue: string
    activeAddModal: boolean
    setCurrentValue: (currentValue: string) => void
    setValueCount: (valueCount: number) => void
    setActiveAddModal: (activeAddModal: boolean) => void
    onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Values = React.memo((props: ValueListPropsType) => {

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
        props.setActiveAddModal(true)
        props.setCurrentValue(id)
    }, [props])

    return (
        <div className="values">
            <div className={'values__header'}>
                <span className={'values__value-rank'}>Rank</span>
                <span className={'values__value-symbol'}>Symbol</span>
                <span className={'values__value-name'}>Name</span>
                <span className={'values__value-price'}>Price $</span>
                <span className={'values__value-changes'}>Changes</span>
                <span style={{minWidth: '70px'}}>Add</span>
            </div>
            {currentPageValues.map(v => <div className={'values__value'} onClick={openValuePage(v.id)}>
                <div className={'values__value-rank'}>
                    {v.rank}
                </div>
                <div className={'values__value-symbol'}>
                    {v.symbol}
                </div>
                <div className={'values__value-name'}>
                    {v.name}
                </div>
                <div className={'values__value-price'}>
                    {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)} $
                </div>
                <div className={'values__value-changes'} style={{color: +v.changePercent24Hr > 0 ? 'green' : 'red'}}>
                    {+(+v.changePercent24Hr).toFixed(2)}%
                </div>
                <div className={'values__value-add'} onClick={openAddModal(v.id)}>
                    Add
                </div>
            </div>)}
            <AddModal activeAddModal={props.activeAddModal} setActiveAddModal={props.setActiveAddModal} values={props.values}
                      valueCount={props.valueCount} onValueCountChange={props.onValueCountChange}
                      currentValue={props.currentValue} setValueCount={props.setValueCount}/>
            <Pagination valuesPerPage={valuesPerPage} totalValues={totalValues} changeCurrentPage={changeCurrentPage}
                        currentPage={currentPage}/>
        </div>
    );
})
