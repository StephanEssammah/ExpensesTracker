import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts'

interface Props {
  data: number[][]
  chartType: string,
}


const DashboardChart: React.FC<Props> = ({data, chartType}) => {
  
  return (
    <ResponsiveContainer className="chart" width="100%" height={200}>
      {chartType === 'Line' 
      ? 
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CFEF0A" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#CFEF0A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke="#CFEF0A" fill="url(#color)" />
          <XAxis dataKey="date" interval={3}/>
          <YAxis dataKey="value" tickFormatter={number => `${number}kr`} />
          <CartesianGrid opacity={0.075} />
        </AreaChart>
      : 
        <BarChart data={data}>
          <XAxis dataKey="date" interval={3}/>
          <YAxis dataKey="value" tickFormatter={number => `${number}kr`} />
          <CartesianGrid opacity={0.075} />
          <Bar dataKey="value" barSize={10} fill="#CFEF0A" />
        </BarChart>
      }
    </ResponsiveContainer>
  )
};

export default DashboardChart;
