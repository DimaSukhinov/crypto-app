import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { GraphicDataType } from '../values/value/Value';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartPropsType = {
  data: GraphicDataType[]
}

export const LineChart = React.memo(({ data }: ChartPropsType) => {

  const [dayData, setDayData] = useState<GraphicDataType[]>([]);

  useEffect(() => {
    const last = data.length - 1;
    setDayData(data.slice(last - 24, last));
  }, [data]);

  return <Line width='360px' height='210px' data={{
    labels: [...dayData.map(d => d.date.slice(11, 16))],
    datasets: [
      {
        label: 'Usd',
        fill: false,
        backgroundColor: '#8d93ab',
        borderColor: '#8884d8',
        borderWidth: 2,
        data: [...dayData.map(d => d.priceUsd)],
      },
    ],
  }} />;
});
