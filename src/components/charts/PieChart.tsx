import { AspectRatio, Box, Stack } from '@mui/joy';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PieChartWrapper({ data }: { data: any }) {
  return (
    <Stack sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }}>
      <AspectRatio sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }} variant="soft">
        <Box>

          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      </AspectRatio>
    </Stack>

  );
};

