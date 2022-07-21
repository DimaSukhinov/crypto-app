import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {GraphicDataType} from '../values/value/Value';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartPropsType = {
    chartValue: 'day' | '2days'
    data: GraphicDataType[]
}

export const Chart = React.memo(({chartValue, data}: ChartPropsType) => {

    let dayLabels = data.map(d => d.date.slice(11, 16))
    let weekLabels = data.map(d => d.date.slice(0, 10) + ' - ' + d.date.slice(12, 16))

    return <Line width="360px" height="210px" data={{
        labels: chartValue === 'day' ? [...dayLabels] : [...weekLabels],
        datasets: [
            {
                label: 'Usd',
                fill: false,
                backgroundColor: '#8d93ab',
                borderColor: '#8884d8',
                borderWidth: 2,
                data: [...data.map(d => d.priceUsd)]
            }
        ]
    }}/>;
})
