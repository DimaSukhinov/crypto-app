import {useCallback, useEffect, useState} from 'react';
import {GraphicDataType} from '../components/values/value/Value';
import {cryptoAPI} from '../api/api';

export const useDrawChart = (value: string) => {

    const [data, setData] = useState<GraphicDataType[]>([])
    const [chartData, setChartData] = useState<GraphicDataType[]>([])
    const [chartValue, setChartValue] = useState<'day' | '2days'>('day')

    useEffect(() => {
        cryptoAPI.graphic(value).then((data) => {
            setData(data.data.data)
            setChartData(data.data.data.reverse().slice(0, 24).reverse())
        })
    }, [value])

    const drawChart = useCallback((data: any, value: 'day' | '2days') => () => {
        setChartData(data)
        setChartValue(value)
    }, [])

    return {data, chartValue, chartData, drawChart}
}
