import React, {useCallback, useEffect, useState} from 'react';
import './Value.scss';
import {ValueType} from '../../../store/values-reducer';
import {Chart} from '../../chart/Chart';
import {cryptoAPI} from '../../../api/api';
import {Button} from '../../common/button/Button';
import {useOpenAddModal} from '../../../hooks/UseOpenAddModal';

type ValuePropsType = {
    value: string
    values: ValueType[]
    navigateToValues: () => void
}

export type GraphicDataType = {
    date: string
    priceUsd: string
    time: number
    circulatingSupply: string
}

export const Value = React.memo(({value, values, navigateToValues}: ValuePropsType) => {

    const {openAddModal} = useOpenAddModal()

    const [data, setData] = useState<GraphicDataType[]>([])
    const [chartData, setChartData] = useState<GraphicDataType[]>([])
    const [chartValue, setChartValue] = useState<'day' | '2days'>('day')

    useEffect(() => {
        cryptoAPI.graphic(value).then((data) => {
            setData(data.data.data)
            setChartData(data.data.data.reverse().slice(0, 24).reverse())
        })
    }, [value])

    const backToValuesPage = useCallback(() => navigateToValues(), [navigateToValues])

    const onOpenAddModal = useCallback((id: string) => () => openAddModal(id), [openAddModal])

    const drawDayChart = useCallback(() => {
        setChartData(data.reverse().slice(0, 24))
        setChartValue('day')
    }, [data])

    const drawWeekChart = useCallback(() => {
        setChartData(data.reverse().slice(0, 48))
        setChartValue('2days')
    }, [data])

    return (
        <div className={'value'}>
            {values.map(v => v.id === value && <>
                <div className={'value__header'}>
                    <div className={'value__header-back'} onClick={backToValuesPage}>Go back</div>
                    <div>{v.name}</div>
                </div>
                <div className={'value__content'}>
                    <div className={'value__graphic'}>
                        <Chart data={chartData} chartValue={chartValue}/>
                        <span className={`${chartValue === 'day' && 'value__graphic-item-active'} value__graphic-item`}
                              onClick={drawDayChart}>24Hr</span>
                        <span
                            className={`${chartValue === '2days' && 'value__graphic-item-active'} value__graphic-item`}
                            onClick={drawWeekChart}>48hr</span>
                    </div>
                    <div>
                        <div className={'value__item'}>
                            Symbol: {v.symbol}
                        </div>
                        <div className={'value__item'}>
                            Price: {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)} $
                        </div>
                        <div className={'value__item'}>
                            Changes: <span style={{color: +v.changePercent24Hr > 0 ? 'green' : 'red'}}>
                                {+(+v.changePercent24Hr).toFixed(2)}%</span>
                        </div>
                        <div className={'value__item'}>
                            MarketCap: {+(+v.marketCapUsd).toFixed(2)} $
                        </div>
                        <Button onClickHandler={onOpenAddModal(v.id)}>Add</Button>
                    </div>
                </div>
            </>)}
        </div>
    );
})
