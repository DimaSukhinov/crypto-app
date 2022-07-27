import React, {ChangeEvent, useCallback} from 'react';
import Pagination from '@mui/material/Pagination';

type PaginationPropsType = {
    totalValues: number
    valuesPerPage: number
    currentPage: number
    changeCurrentPage: (page: number) => void
}

export const MaterialPagination = React.memo(({
                                                  totalValues, valuesPerPage, changeCurrentPage, currentPage
                                              }: PaginationPropsType) => {

    const pages = []

    for (let i = 1; i <= Math.ceil(totalValues / valuesPerPage); i++) {
        pages.push(i)
    }

    const handleChange = useCallback((e: ChangeEvent<unknown>, page: number) => changeCurrentPage(page), [changeCurrentPage])

    return <Pagination count={pages.length} page={currentPage} color="primary" onChange={handleChange}
                       sx={{m: '30px 0', display: 'flex', justifyContent: 'center'}}/>
})
