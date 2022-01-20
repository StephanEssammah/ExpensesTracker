import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts'

interface Props {
  data: number[][]
}


const DashboardChart: React.FC<Props> = ({data}) => {
  return (
    <ResponsiveContainer className="chart" width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CFEF0A" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#CFEF0A" stopOpacity={0} />

          </linearGradient>
        </defs>
        <Area dataKey="value" stroke="#CFEF0A" fill="url(#color)" />
        <XAxis dataKey="date" interval={3}/>
        <YAxis 
          dataKey="value" 
          tickFormatter={number => `${number}kr`}
        />
        <CartesianGrid opacity={0.075} />
      </AreaChart>

    </ResponsiveContainer>
  )
};

export default DashboardChart;
