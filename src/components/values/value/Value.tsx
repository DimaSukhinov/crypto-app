import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import './Value.scss';
import {ValueType} from '../../../store/values-reducer';
import {useDispatch} from 'react-redux';
import {addToPortfolioAC} from '../../../store/portfolio-reducer';
import {Chart} from '../../chart/Chart';
import {cryptoAPI} from '../../../api/api';

type ValuePropsType = {
    value: string
    values: ValueType[]
    valueCount: number
    navigateToValues: () => void
    setValueCount: (valueCount: number) => void
    onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export type GraphicDataType = {
    date: string
    priceUsd: string
}

export const Value = React.memo((props: ValuePropsType) => {

    const dispatch = useDispatch()
    const [data, setData] = useState<GraphicDataType[]>([])

    useEffect(() => {
        cryptoAPI.graphic(props.value).then((data) => {
            setData(data.data.data.reverse().slice(0, 24).reverse())
        })
    }, [props.value])

    const backToValuesPage = useCallback(() => props.navigateToValues(), [props])

    const addToPortfolio = (id: string, name: string, price: string, valueCount: number) => () => {
        dispatch(addToPortfolioAC(id, name, +price, valueCount))
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
                        <Chart data={data}/>
                    </div>
                    <div className={'value__about-container'}>
                        <div className={'value__about'}>
                            <div className={'value__about-item'}>
                                Symbol: {v.symbol}
                            </div>
                            <div className={'value__about-item'}>
                                Price: {+(+v.priceUsd).toFixed(2)} $
                            </div>
                            <div className={'value__about-item'}>
                                Changes: <span style={{color: +v.changePercent24Hr > 0 ? 'green' : 'red'}}>
                                {+(+v.changePercent24Hr).toFixed(2)}%</span>
                            </div>
                            <div className={'value__about-item'}>
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
