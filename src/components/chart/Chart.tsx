import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {GraphicDataType} from '../values/value/Value';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartPropsType = {
    data: GraphicDataType[]
}

export const Chart = React.memo((props: ChartPropsType) => {

    return <Line width="360px" height="210px" data={{
        labels: [...props.data.map(d => d.date.slice(11, 16))],
        datasets: [
            {
                label: 'Usd',
                fill: false,
                backgroundColor: '#8d93ab',
                borderColor: '#8884d8',
                borderWidth: 2,
                data: [...props.data.map(d => d.priceUsd)]
            }
        ]
    }}/>;
})