import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
 }

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index } : LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
  // Überprüfen, ob die Berechnung korrekt ist und die Labels zentriert positioniert
  return (
     <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`}
     </text>
  );
 };

export default function PieChartWrapper({ data }: { data: any }) {
  console.log(data);
  return (
    <PieChart width={500} height={500}>
      <Pie
        data={data}
        cx={235}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={170}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry:any, index:number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

