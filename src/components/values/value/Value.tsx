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
    time: number
    circulatingSupply: string
}

export const Value = React.memo(({
                                     value, valueCount, onValueCountChange, setValueCount, currentValue, values, error,
                                     setCurrentValue, navigateToValues, activeAddModal, setActiveAddModal, setError
                                 }: ValuePropsType) => {

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

    const openAddModal = useCallback((id: string) => (e: any) => {
        e.stopPropagation()
        setActiveAddModal(true)
        setCurrentValue(id)
        setError(false)
        setValueCount(0)
    }, [setActiveAddModal, setCurrentValue, setError, setValueCount])

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
            {values.map(v => v.id === value && <>
                <div className={'value__header'}>
                    <div className={'value__header-back'} onClick={backToValuesPage}>Go back</div>
                    <div>{v.name}</div>
                </div>
                <div className={'value__content'}>
                    <div className={'value__graphic'}>
                        <Chart data={chartData} chartValue={chartValue}/>
                        <span
                            className={`${chartValue === 'day' && 'value__graphic-item-active'} value__graphic-item`}
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
                        <div className={'value__item values__add-button'} onClick={openAddModal(v.id)}>
                            Add
                        </div>
                    </div>
                </div>
            </>)}
            <AddModal currentValue={currentValue} values={values} valueCount={valueCount} setError={setError}
                      setActiveAddModal={setActiveAddModal} activeAddModal={activeAddModal} error={error}
                      setValueCount={setValueCount} onValueCountChange={onValueCountChange}
            />
        </div>
    );
})
