import React, {useCallback, useEffect, useState} from 'react';
import './Values.scss';
import {ValueType} from '../../store/values-reducer';
import {Pagination} from '../pagination/Pagination';
import {ValuesList} from './valuesList/ValuesList';
import {usePaginationValues} from '../../hooks/CustomHooks';

type ValuesPropsType = {
    values: ValueType[]
    navigateToValue: (id: string) => void
}

export const Values = React.memo(({values, navigateToValue}: ValuesPropsType) => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const {currentPageValues, valuesPerPage, totalValues} = usePaginationValues(values, currentPage)

    useEffect(() => {
        let page = sessionStorage.getItem('page')
        if (page) {
            let newValue = JSON.parse(page)
            setCurrentPage(newValue)
        }
    }, [])

    const changeCurrentPage = useCallback((page: number) => {
        setCurrentPage(page)
        sessionStorage.setItem('page', JSON.stringify(page))
    }, [setCurrentPage])

    return (
        <div className="values">
            <div className={'values__header'}>
                <span className={'values__rank'}>Rank</span>
                <span className={'values__symbol'}>Symbol</span>
                <span className={'values__name'}>Name</span>
                <span className={'values__price'}>Price $</span>
                <span className={'values__changes'}>Changes</span>
                <span className={'values__add-header'}>Add</span>
            </div>
            <ValuesList currentPageValues={currentPageValues} navigateToValue={navigateToValue}/>
            <Pagination valuesPerPage={valuesPerPage} totalValues={totalValues}
                        changeCurrentPage={changeCurrentPage} currentPage={currentPage}/>
        </div>
    );
})
