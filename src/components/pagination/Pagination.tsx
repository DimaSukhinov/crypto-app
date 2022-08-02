import React, { useCallback } from 'react';
import './Pagination.scss';

type PaginationPropsType = {
  totalValues: number
  valuesPerPage: number
  currentPage: number
  changeCurrentPage: (page: number) => void
}

export const Pagination = React.memo(({
                                        totalValues, valuesPerPage, changeCurrentPage, currentPage,
                                      }: PaginationPropsType) => {

  const pages = [];

  for (let i = 1; i <= Math.ceil(totalValues / valuesPerPage); i++) {
    pages.push(i);
  }

  const changePage = useCallback((page: number) => () => changeCurrentPage(page), [changeCurrentPage]);

  return (
    <div className={'pages'} data-testid={'pagination'}>
      {pages.map(p => <span key={p} data-testid={'pagination-elem'}
                            className={currentPage === p ? 'pages__page pages__page-active' : 'pages__page'}
                            onClick={changePage(p)}>{p}</span>)}
    </div>
  );
});
