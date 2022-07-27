import React, {useCallback, useEffect, useState} from 'react';
import {ValueType} from '../../store/values-reducer';
import {usePaginationValues} from '../../hooks/CustomHooks';
import {MaterialValuesList} from './valuesList/MaterialValuesList';
import {MaterialPagination} from '../pagination/MaterialPagination';

type ValuesPropsType = {
    values: ValueType[]
    navigateToValue: (id: string) => void
    openAddModal: (id: string) => void
}

export const MaterialValues = React.memo(({values, navigateToValue, openAddModal}: ValuesPropsType) => {

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
            <MaterialValuesList currentPageValues={currentPageValues} navigateToValue={navigateToValue}
                                openAddModal={openAddModal}/>
            <MaterialPagination valuesPerPage={valuesPerPage} totalValues={totalValues}
                        changeCurrentPage={changeCurrentPage} currentPage={currentPage}/>
        </div>
    );
})
