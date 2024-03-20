import { Report } from "@/types/Report";
import { CloseSharp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

const defaultStore: Report = { title: 'Undefined', description: 'Undefined', truck: [], warehouse: [], products: { co2: -999, items: [] } };

export default function ReportProvider({ timestamp, content, setContent, index }: { timestamp: string, content: JSX.Element[], setContent: Function, index: number }) {

  const [data, setData] = useState<Report>(defaultStore);

  useEffect(() => {
    fetch(`/api/getDataPoint?timestamp=${timestamp}`).then((e) => e.json()).then((e: { data: Report }) => {
      setData(e.data || defaultStore)
    })
  }, [timestamp])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <Typography level="h1">{data.title} - {timestamp}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
            <IconButton onClick={() => {
              setContent((old: JSX.Element[]) => {
                let firstPart = (index > 0) ? old.slice(0, index - 1) : []
                return ([
                  ...firstPart,
                  ...old.slice(index + 1)
                ])
              })
            }} sx={{ display: 'flex', alignItems: 'center' }}>
              <CloseSharp />
            </IconButton>
          </Box>
        </Box>
        <Typography level="body-md">{data.description}</Typography>
      </Box>
    </Box >
  )
}
