import React, {ChangeEvent, useCallback} from 'react';
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
    error: boolean
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    setError: (error: boolean) => void
    setCurrentValue: (currentValue: string) => void
    setValueCount: (valueCount: number) => void
    setActiveAddModal: (activeAddModal: boolean) => void
    onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Values = React.memo(({
                                      values, valueCount, onValueCountChange, currentValue, currentPage, error,
                                      setValueCount, activeAddModal, setActiveAddModal, setError, setCurrentValue,
                                      setCurrentPage, navigateToValue
                                  }: ValueListPropsType) => {

    const valuesPerPage: number = 14
    const totalValues: number = values.length

    const lastValueIndex = currentPage * valuesPerPage
    const firstValueIndex = lastValueIndex - valuesPerPage
    const currentPageValues = values.slice(firstValueIndex, lastValueIndex)

    const changeCurrentPage = useCallback((page: number) => {
        setCurrentPage(page)
        sessionStorage.setItem('page', JSON.stringify(page))
    }, [setCurrentPage])

    const openValuePage = useCallback((id: string) => () => navigateToValue(id), [navigateToValue])

    const openAddModal = useCallback((id: string) => (e: any) => {
        e.stopPropagation()
        setActiveAddModal(true)
        setCurrentValue(id)
        setError(false)
        setValueCount(0)
    }, [setActiveAddModal, setCurrentValue, setError, setValueCount])

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
            <AddModal activeAddModal={activeAddModal} setActiveAddModal={setActiveAddModal}
                      values={values}
                      valueCount={valueCount} onValueCountChange={onValueCountChange} error={error}
                      currentValue={currentValue} setValueCount={setValueCount} setError={setError}/>
            <Pagination valuesPerPage={valuesPerPage} totalValues={totalValues} changeCurrentPage={changeCurrentPage}
                        currentPage={currentPage}/>
        </div>
    );
})
