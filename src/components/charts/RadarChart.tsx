import { AspectRatio, Box, Stack } from "@mui/joy";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function RadarChartWrapper({ data, xAxis, yAxis }: { data: any, xAxis: string, yAxis: string }) {
  return (
    <Stack sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }}>
      <AspectRatio sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }} variant="soft">
        <Box>
          <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          </ResponsiveContainer>
        </Box>
      </AspectRatio>
    </Stack>
  );
}
