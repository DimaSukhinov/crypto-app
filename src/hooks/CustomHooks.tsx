import React, {useState} from 'react';
import {ValueType} from '../store/values-reducer';
import {PortfolioType} from '../store/portfolio-reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {AppRootStateType} from '../store/store';

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const useSnackbar = () => {

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
    const [snackbarMessage, setSnackbarMessage] = useState<string>('This is a success message!')

    return {openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage, snackbarSeverity, setSnackbarSeverity}
}

export const useCurrentWalletValue = (portfolio: PortfolioType[], values: ValueType[]) => {

    const currentWalletValueArr = portfolio.map(p => values
        .map(v => v.id === p.id && +(p.valueCount * +v.priceUsd)).reduce((acc: any, num: any) => acc + num, 0))
    const currentWalletValue = currentWalletValueArr.reduce((acc: any, num: any) => acc + num, 0).toFixed(2)
    const originalWalletValue = portfolio.map(p => p !== null && p.valueCount * p.price).reduce((acc: any, num: any) => acc + num, 0).toFixed(2)
    const walletDifference = currentWalletValue - originalWalletValue
    const walletDifferencePercent = walletDifference / currentWalletValue

    return <>
        {currentWalletValue + ' USD '}
        {currentWalletValue > 0 && <span style={{color: walletDifference > 0 ? '#0abd0a' : '#cb2424'}}>
            {walletDifference.toFixed(2)} $ ({walletDifferencePercent.toFixed(4)} %)
        </span>}
    </>
}

export const usePaginationValues = (values: ValueType[], currentPage: number) => {

    const valuesPerPage: number = 14
    const totalValues: number = values.length

    const lastValueIndex = currentPage * valuesPerPage
    const firstValueIndex = lastValueIndex - valuesPerPage
    const currentPageValues = values.slice(firstValueIndex, lastValueIndex)

    return {currentPageValues, valuesPerPage, totalValues}
}
