import React from 'react';
import ChartBar from './ChartBar';
import './Chart.css';

type DataPoint = {
  label: string;
  value: number;
};

type ChartProps = {
  dataPoints: DataPoint[];
};

const Chart = (props: ChartProps) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues, 0);

  return (
    <div className='chart'>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
