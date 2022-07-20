import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import './Value.scss';
import {ValueType} from '../../../store/values-reducer';
import {Chart} from '../../chart/Chart';
import {cryptoAPI} from '../../../api/api';
import {AddModal} from '../../modal/addModal/AddModal';

type ValuePropsType = {
    value: string
    values: ValueType[]
    currentValue: string
    activeAddModal: boolean
    valueCount: number
    error: boolean
    setError: (error: boolean) => void
    navigateToValues: () => void
    setCurrentValue: (currentValue: string) => void
    setValueCount: (valueCount: number) => void
    setActiveAddModal: (activeAddModal: boolean) => void
    onValueCountChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export type GraphicDataType = {
    date: string
    priceUsd: string
}

export const Value = React.memo((props: ValuePropsType) => {

    const [data, setData] = useState<GraphicDataType[]>([])
    const [chartData, setChartData] = useState<GraphicDataType[]>([])
    const [chartValue, setChartValue] = useState<'day' | '2days'>('day')

    useEffect(() => {
        cryptoAPI.graphic(props.value).then((data) => {
            setData(data.data.data)
            setChartData(data.data.data.reverse().slice(0, 24).reverse())
        })
    }, [props.value])

    const backToValuesPage = useCallback(() => props.navigateToValues(), [props])

    const openAddModal = useCallback((id: string) => (e: any) => {
        e.stopPropagation()
        props.setActiveAddModal(true)
        props.setCurrentValue(id)
        props.setError(false)
        props.setValueCount(0)
    }, [props])

    const drawDayChart = useCallback(() => {
        setChartData(data.reverse().slice(0, 24).reverse())
        setChartValue('day')
    }, [data])

    const drawWeekChart = useCallback(() => {
        setChartData(data.reverse().slice(0, 48))
        setChartValue('2days')
    }, [data])

    return (
        <div className={'value'}>
            {props.values.map(v => v.id === props.value && <>
                <div className={'value__header'}>
                    <div className={'value__header-back'} onClick={backToValuesPage}>Go back</div>
                    <div className={'value__header-name'}>
                        {v.name}
                    </div>
                </div>
                <div className={'value__content'}>
                    <div className={'value__content-graphic'}>
                        <Chart data={chartData} chartValue={chartValue}/>
                        <span
                            className={`${chartValue === 'day' && 'value__content-graphic-item-active'} value__content-graphic-item`}
                            onClick={drawDayChart}>24Hr</span>
                        <span
                            className={`${chartValue === '2days' && 'value__content-graphic-item-active'} value__content-graphic-item`}
                            onClick={drawWeekChart}>48hr</span>
                    </div>
                    <div className={'value__content-about'}>
                        <div className={'value__content-about-item'}>
                            Symbol: {v.symbol}
                        </div>
                        <div className={'value__content-about-item'}>
                            Price: {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)} $
                        </div>
                        <div className={'value__content-about-item'}>
                            Changes: <span style={{color: +v.changePercent24Hr > 0 ? 'green' : 'red'}}>
                                {+(+v.changePercent24Hr).toFixed(2)}%</span>
                        </div>
                        <div className={'value__content-about-item'}>
                            MarketCap: {+(+v.marketCapUsd).toFixed(2)} $
                        </div>
                        <div className={'value__content-about-item values__value-add'} onClick={openAddModal(v.id)}>
                            Add
                        </div>
                    </div>
                </div>
            </>)}
            <AddModal currentValue={props.currentValue} values={props.values} valueCount={props.valueCount}
                      setActiveAddModal={props.setActiveAddModal} activeAddModal={props.activeAddModal}
                      setValueCount={props.setValueCount} onValueCountChange={props.onValueCountChange}
                      setError={props.setError} error={props.error}/>
        </div>
    );
})
