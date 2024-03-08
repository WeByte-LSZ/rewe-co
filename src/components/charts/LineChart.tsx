import { AspectRatio, Box, Stack } from "@mui/joy";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function LineChartWrapper({ data, xAxis, yAxies }: | { data: any, xAxis: string, yAxies: string }) {
  return (
    <Stack sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }}>
      <AspectRatio sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }} variant="soft">
        <Box>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              width={500}
              height={400}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis dataKey={yAxies} />
              <Tooltip />
              <Line dataKey={yAxies} fill="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </AspectRatio>
    </Stack>
  );
}
