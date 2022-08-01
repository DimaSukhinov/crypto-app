import React from 'react';
import './PortfolioValue.scss';
import {PortfolioType} from '../../../../store/portfolio-reducer';

type PortfolioModalPropsType = {
    portfolio: PortfolioType[]
    removeValueFromPortfolio: (id: string) => () => void
}

export const PortfolioValue = React.memo(({portfolio, removeValueFromPortfolio}: PortfolioModalPropsType) => {

    return <>
        {portfolio.map(v => <div key={v.id} data-testid={'portfolio-elem'} className={'portfolio__value'}>
            <div className={'portfolio__name portfolio__element'}>
                {v.name}
            </div>
            <div className={'portfolio__amount portfolio__element'}>
                {v.valueCount}
            </div>
            <div className={'portfolio__price-usd portfolio__element'}>
                {(v.valueCount * v.price).toFixed(2)} $
            </div>
            <div className={'portfolio__delete-button'} onClick={removeValueFromPortfolio(v.id)}>
                -
            </div>
        </div>)}
    </>
})
