import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ScatterChartWrapper({data, xAxis, yAxis} : |{data:any, xAxis:string, yAxis:string}){
      return (
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey={xAxis} name={xAxis}/>
            <YAxis type="number" dataKey={yAxis} name={yAxis}/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      );
}
  