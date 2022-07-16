import React, {useCallback} from 'react';
import './Pagination.scss';

type PaginationPropsType = {
    totalValues: number
    valuesPerPage: number
    currentPage: number
    changeCurrentPage: (page: number) => void
}

export const Pagination = React.memo((props: PaginationPropsType) => {

    const pages = []

    for (let i = 1; i <= Math.ceil(props.totalValues / props.valuesPerPage); i++) {
        pages.push(i)
    }

    const changePage = useCallback((page: number) => () => props.changeCurrentPage(page), [props])

    return (
        <div className={'pages'}>
            {pages.map(p => <span className={props.currentPage === p ? 'pages__page pages__page-active' : 'pages__page'}
                                  onClick={changePage(p)}>{p}</span>)}
        </div>
    );
})
