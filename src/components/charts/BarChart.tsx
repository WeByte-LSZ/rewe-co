import { AspectRatio, Box, Stack } from "@mui/joy";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function BarChartWrapper({ data, xAxis, yAxies }: { data: any, xAxis: string, yAxies: string }) {
  return (
    <Stack sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }}>
      <AspectRatio sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }} variant="soft">
        <Box>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <YAxis dataKey={yAxies} />
              <Tooltip />
              <Bar dataKey={yAxies} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </AspectRatio>
    </Stack>
  );
}
