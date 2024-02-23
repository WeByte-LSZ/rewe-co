import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

export default function RadialChartWrapper({ data, xAxis, yAxis }: { data: any, xAxis: string, yAxis: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
        <RadialBar
          label={{ position: 'insideStart', fill: '#fff' }}
          background
          dataKey="uv"
        />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
