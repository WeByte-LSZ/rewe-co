import { AspectRatio, Box, Stack } from "@mui/joy";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AreaChartWrapper({ data, xAxis, yAxies }: { data: any, xAxis: string, yAxies: string }) {
  return (
<Stack sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }}>
      <AspectRatio sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }} variant="soft">
        <Box>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              height={100}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
              style={{
                backgroundColor: 'transparent'
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis dataKey={yAxies} />
              <Tooltip />
              <Area type="monotone" dataKey={yAxies} />
            </AreaChart>
          </ResponsiveContainer>
          </Box>
      </AspectRatio>
    </Stack>
  );
}
