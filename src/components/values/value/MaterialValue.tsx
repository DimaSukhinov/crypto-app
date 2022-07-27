import React, {useCallback} from 'react';
import {ValueType} from '../../../store/values-reducer';
import {Chart} from '../../chart/Chart';
import {useDrawChart} from '../../../hooks/UseDrawChart';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

type ValuePropsType = {
    value: string
    values: ValueType[]
    navigateToValues: () => void
    openAddModal: (id: string) => void
}

export type GraphicDataType = {
    date: string
    priceUsd: string
    time: number
    circulatingSupply: string
}

export const MaterialValue = React.memo(({value, values, navigateToValues, openAddModal}: ValuePropsType) => {

    const {chartData, chartValue, data, drawChart} = useDrawChart(value)

    const backToValuesPage = useCallback(() => navigateToValues(), [navigateToValues])
    const onOpenAddModal = useCallback((id: string) => () => openAddModal(id), [openAddModal])

    return (
        <>
            {values.map(v => v.id === value && <>
                <IconButton>
                    <ArrowBackIosIcon onClick={backToValuesPage}/>
                </IconButton>
                <Divider/>
                <Chart data={chartData} chartValue={chartValue}/>
                <Button variant="text" onClick={drawChart(data.reverse().slice(0, 24).reverse(), 'day')}>
                    24Hr</Button>
                <Button variant="text" onClick={drawChart(data.reverse().slice(0, 48).reverse(), '2days')}>
                    48Hr</Button>
                <Grid container spacing={3}>
                    <Grid item xs={12}>Symbol: {v.symbol}</Grid>
                    <Grid item xs={12}>
                        Price: {+v.priceUsd > 1 ? +(+v.priceUsd).toFixed(2) : +(+v.priceUsd).toFixed(5)} $
                    </Grid>
                    <Grid item xs={12}>Changes: {+(+v.changePercent24Hr).toFixed(2)}%</Grid>
                    <Grid item xs={12}>MarketCap: {+(+v.marketCapUsd).toFixed(2)} $</Grid>
                    <Grid item xs={12}>
                        <Button variant={'outlined'} onClick={onOpenAddModal(v.id)}>Add</Button>
                    </Grid>
                </Grid>
            </>)}
        </>
    );
})
