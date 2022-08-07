// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type CircleChartPropsType = {
  data: ChartDataType[]
}

type ChartDataType = {
  name: string
  price: number
}

export const CircleChart = React.memo(({ data }: CircleChartPropsType) => {

  const svgRef = useRef();
  const color = d3.scaleOrdinal().range(d3.schemeSet2);

  useEffect(() => {

    const w = 250;
    const h = 250;
    const radius = w / 2;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('overflow', 'visible');

    const formattedData = d3.pie().value(d => d.price)(data);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll()
      .data(formattedData)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', d => color(d.value))
      .attr('stroke', 'white');

    svg.selectAll()
      .data(formattedData)
      .join('text')
      .text(d => d.data.name)
      .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
      .style('text-anchor', 'middle');

  }, [data]);

  return <div style={{ height: '390px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
    <svg ref={svgRef} />
  </div>;
});
