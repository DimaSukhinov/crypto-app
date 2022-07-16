import React, {ChangeEvent, useCallback} from 'react';
import './Value.scss';
import {ValueType} from '../../../store/values-reducer';
import {useDispatch} from 'react-redux';
import {addToPortfolioAC} from '../../../store/portfolio-reducer';

type ValuePropsType = {
    value: string
    valueCount: number
    values: ValueType[]
    navigateToValues: () => void
    setValueCount: (valueCount: number) => void
    onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Value = React.memo((props: ValuePropsType) => {

    const dispatch = useDispatch()

    const backToValuesPage = useCallback(() => props.navigateToValues(), [props])

    const addToPortfolio = (id: string, name: string, price: string, valueCount: number) => () => {
        dispatch(addToPortfolioAC(id, name, price, valueCount))
        props.setValueCount(0)
    }

    return (
        <div className={'value'}>
            {props.values.map(v => v.id === props.value && <>
                <div className={'value__header'}>
                    <div className={'value__back'} onClick={backToValuesPage}>Back</div>
                    <div className={'value__name'}>
                        {v.name}
                    </div>
                </div>
                <div className={'value__description'}>
                    <div className={'value__graphic'}>
                        Graphic
                    </div>
                    <div>
                        <div className={'value__about'}>
                            <div className={'value__item'}>
                                Symbol: {v.symbol}
                            </div>
                            <div className={'value__item'}>
                                Price:
                                {+(+v.priceUsd).toFixed(2)} $
                            </div>
                            <div className={'value__item'}>
                                Changes: <span style={{color: +v.changePercent24Hr > 0 ? 'green' : 'red'}}>
                                {+(+v.changePercent24Hr).toFixed(2)}%</span>
                            </div>
                            <div className={'value__item'}>
                                MarketCap: {+(+v.marketCapUsd).toFixed(2)} $
                            </div>
                        </div>
                        <div className={'value__add'}>
                            <input type="number" onChange={props.onValueCountChange}/>
                            Price: {(props.valueCount * +v.priceUsd).toFixed(2)} $
                            <div className={'valueList__add'}
                                 onClick={addToPortfolio(v.id, v.name, v.priceUsd, props.valueCount)}>
                                Add
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </div>
    );
})
