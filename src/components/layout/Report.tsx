import { Report } from "@/types/Report";
import { CloseSharp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/joy";

export default function ReportProvider({ data, timestamp }: { data: Report, timestamp: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <Typography level="h1">{data.title} - {timestamp}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
            <IconButton sx={{ display: 'flex', alignItems: 'center' }}>
              <CloseSharp />
            </IconButton>
          </Box>
        </Box>
        <Typography level="body-md">{data.description}</Typography>
      </Box>
    </Box>
  )
}
