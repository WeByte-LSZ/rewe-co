import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



export default function StackedBarChartWrapper({ data, xAxis, yAxis }: { data: any, xAxis: string, yAxis: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis dataKey={yAxis} />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
    </ResponsiveContainer>
  );

  }
