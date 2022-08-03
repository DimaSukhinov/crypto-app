import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphicDataType } from '../values/value/Value';

type ChartPropsType = {
  chartValue: 'day' | '2days'
  data: GraphicDataType[]
}

export const LineChart = React.memo(({ data, chartValue }: ChartPropsType) => {


  return <svg />;
});
