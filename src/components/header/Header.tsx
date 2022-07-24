import React, {useCallback, useState} from 'react';
import './Header.scss';
import {ValueType} from '../../store/values-reducer';
import {useAppSelector, useCurrentWalletValue} from '../../hooks/CustomHooks';
import {PortfolioModal} from '../modals/portfolioModal/PortfolioModal';

type HeaderPropsType = {
    values: ValueType[]
}

export const Header = React.memo(({values}: HeaderPropsType) => {

    const portfolio = useAppSelector((store) => store.portfolio)
    const [activePortfolioModal, setActivePortfolioModal] = useState<boolean>(false)

    const currentWalletValue = useCurrentWalletValue(portfolio, values)

    const TopThreeValues = values.slice(0, 3)

    const openPortfolio = useCallback(() => setActivePortfolioModal(true), [])

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <div className={'header__popular-values'}>
                    {TopThreeValues.map(v => <div className={'header__item'}>
                        <span>{v.symbol} </span>
                        {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)}$
                    </div>)}
                </div>
                <span>
                    {currentWalletValue}
                </span>
                <div className={'header__portfolio-button'} onClick={openPortfolio}>
                    Portfolio
                </div>
            </div>
            <PortfolioModal values={values} activePortfolioModal={activePortfolioModal}
                            setActivePortfolioModal={setActivePortfolioModal}/>
        </div>
    );
})
