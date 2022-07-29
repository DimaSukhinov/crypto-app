import React, {useCallback, useEffect, useState} from 'react';
import {ValueType} from '../../store/values-reducer';
import {Pagination} from '../pagination/Pagination';
import {ValuesList} from './valuesList/ValuesList';
import {usePaginationValues} from '../../hooks/CustomHooks';

type ValuesPropsType = {
    values: ValueType[]
    navigateToValue: (id: string) => void
    openAddModal: (id: string) => void
}

export const Values = React.memo(({values, navigateToValue, openAddModal}: ValuesPropsType) => {

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
        <>
            <ValuesList currentPageValues={currentPageValues} navigateToValue={navigateToValue}
                        openAddModal={openAddModal}/>
            <Pagination valuesPerPage={valuesPerPage} totalValues={totalValues}
                        changeCurrentPage={changeCurrentPage} currentPage={currentPage}/>
        </>
    );
})
