import React from 'react';
import {ValueType} from '../store/values-reducer';
import {PortfolioType} from '../store/portfolio-reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {AppRootStateType} from '../store/store';

export const useCurrentWalletValue = (portfolio: PortfolioType[], values: ValueType[]) => {

    const currentWalletValueArr = portfolio.map(p => values
        .map(v => v.id === p.id && +(p.valueCount * +v.priceUsd)).reduce((acc: any, num: any) => acc + num, 0))
    const currentWalletValue = currentWalletValueArr.reduce((acc: any, num: any) => acc + num, 0).toFixed(2)
    const originalWalletValue = portfolio.map(p => p !== null && p.valueCount * p.price).reduce((acc: any, num: any) => acc + num, 0).toFixed(2)
    const walletDifference = currentWalletValue - originalWalletValue
    const walletDifferencePercent = walletDifference / currentWalletValue

    return <>
        {currentWalletValue + ' USD '}
        {currentWalletValue > 0 && <span style={{color: walletDifference > 0 ? 'green' : 'red'}}>
            {walletDifference.toFixed(2)} $ ({walletDifferencePercent.toFixed(4)} %)
        </span>}
    </>
}

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
