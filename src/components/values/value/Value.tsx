import React from 'react';
import './Value.scss';
import {ValueType} from '../../../store/values-reducer';
import {Chart} from '../../chart/Chart';
import {Button} from '../../common/button/Button';
import {useDrawChart} from '../../../hooks/UseDrawChart';

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

export const Value = React.memo(({value, values, navigateToValues, openAddModal}: ValuePropsType) => {

    const {chartData, chartValue, data, drawChart} = useDrawChart(value)

    return (
        <div className={'value'} data-testid={'value-page'}>
            {values.map(v => v.id === value && <div key={v.id}>
                <div className={'value__header'}>
                    <div className={'value__header-back'} onClick={navigateToValues}>Go back</div>
                    <div>{v.name}</div>
                </div>
                <div className={'value__content'}>
                    <div className={'value__graphic'}>
                        <Chart data={chartData} chartValue={chartValue}/>
                        <span className={`${chartValue === 'day' && 'value__graphic-item-active'} value__graphic-item`}
                              onClick={drawChart(data.reverse().slice(0, 24), 'day')}>24Hr</span>
                        <span
                            className={`${chartValue === '2days' && 'value__graphic-item-active'} value__graphic-item`}
                            onClick={drawChart(data.reverse().slice(0, 48), '2days')}>48hr</span>
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
                        <Button onClickHandler={() => openAddModal(v.id)}>Add</Button>
                    </div>
                </div>
            </div>)}
        </div>
    );
})
