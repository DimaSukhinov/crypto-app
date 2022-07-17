import React, {useCallback, useState} from 'react';
import './Header.scss';
import {Modal} from '../modal/Modal';
import {useAppSelector} from '../../store/store';
import {removeFromPortfolioAC} from '../../store/portfolio-reducer';
import {useDispatch} from 'react-redux';
import {ValueType} from '../../store/values-reducer';

type HeaderPropsType = {
    values: ValueType[]
}

export const Header = React.memo((props: HeaderPropsType) => {

    const dispatch = useDispatch()
    const portfolio = useAppSelector((store) => store.portfolio)
    const [activePortfolioModal, setActivePortfolioModal] = useState<boolean>(false)


    const currentWalletValueArr = portfolio.map(p => props.values
        .map(v => v.id === p.id && +(p.valueCount * +v.priceUsd)).reduce((acc: any, num: any) => acc + num, 0))

    const currentWalletValue = currentWalletValueArr.reduce((acc: any, num: any) => acc + num, 0).toFixed(2)

    const originalWalletValue = portfolio.map(p => p !== null && p.valueCount * p.price).reduce((acc: any, num: any) => acc + num, 0).toFixed(2)

    const walletDifference = currentWalletValue - originalWalletValue

    const walletDifferencePercent = walletDifference / currentWalletValue


    const TopThreeValues = props.values.slice(0, 3)

    const openPortfolio = useCallback(() => setActivePortfolioModal(true), [])

    const removeValueFromPortfolio = useCallback((id: string) => () => dispatch(removeFromPortfolioAC(id)), [dispatch])

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <div className={'header__container-popularValues'}>
                    {TopThreeValues.map(v => <div className={'header__container-popularValues-item'}>
                        <span>{v.symbol} </span>
                        {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)}$
                    </div>)}
                </div>
                <span>
                    {currentWalletValue + ' USD '}
                    {currentWalletValue > 0 && <span style={{color: walletDifference > 0 ? 'green' : 'red'}}>
                        {walletDifference.toFixed(2)} $ ({walletDifferencePercent.toFixed(4)} %)
                    </span>}
                </span>
                <div className={'header__container-portfolio-button'} onClick={openPortfolio}>
                    Portfolio
                </div>
            </div>
            {activePortfolioModal && <Modal active={activePortfolioModal} setActive={setActivePortfolioModal}>
                <div className={'header__portfolio-price'}>
                    <span className={'header__portfolio-price-item'}>Total spent: {originalWalletValue + ' $ '}</span>
                    <span className={'header__portfolio-price-item'}>
                    Current price: {currentWalletValue + ' USD '}
                        {currentWalletValue > 0 && <span style={{color: walletDifference > 0 ? 'green' : 'red'}}>
                        {walletDifference.toFixed(2)} $ ({walletDifferencePercent.toFixed(4)} %)
                    </span>}
                </span>
                </div>
                {portfolio.map(v => <div className={'header__portfolio'}>
                    <div className={'header__portfolio-name header__portfolio-item'}>
                        {v.name}
                    </div>
                    <div className={'header__portfolio-valueCount header__portfolio-item'}>
                        {v.valueCount}
                    </div>
                    <div className={'header__portfolio-priceUsd header__portfolio-item'}>
                        {(v.valueCount * v.price).toFixed(2)} $
                    </div>
                    <div className={'header__portfolio-delete'} onClick={removeValueFromPortfolio(v.id)}>
                        -
                    </div>
                </div>)}
            </Modal>}
        </div>
    );
})
