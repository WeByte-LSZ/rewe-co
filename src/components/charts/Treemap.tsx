import { AspectRatio, Box, Stack } from "@mui/joy";
import { Treemap, ResponsiveContainer } from 'recharts';


export default function TreemapWrapper({ data }: { data: any }) {
  return (
    <Stack sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }}>
      <AspectRatio sx={{ display: 'flex', flexGrow: 1, width: '100%', height: '100%', borderRadius: 5 }} variant="soft">
        <Box>
          <ResponsiveContainer width="100%" height="100%">
            <Treemap width={400} height={200} data={data} dataKey="size" aspectRatio={4 / 3} stroke="#fff" fill="#8884d8" />
          </ResponsiveContainer>
        </Box>
      </AspectRatio>
    </Stack>
  );
}
