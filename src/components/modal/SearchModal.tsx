import { SearchRounded } from "@mui/icons-material";
import { Box, Input, List, ListItemButton, Modal, ModalDialog, Typography } from "@mui/joy";
import { PropsWithChildren, useMemo, useState } from "react";
import FuzzyFinder from '@/lib/fuzzyFinder'

interface ModalProps {
  title: string;
  visibility: boolean;
  setVisibility: Function;
  dataPoints: object[];
  setDatapoints: Function;
  keys: string[];
  setKeys: Function;
  dataToBeDisplayed: Function
}

export default function SearchModal({ visibility, setVisibility, dataPoints, keys, dataToBeDisplayed }: PropsWithChildren<ModalProps>) {
  let fuzzyFinder = useMemo(() => {
    return new FuzzyFinder(dataPoints, keys);
  }, [dataPoints, keys])
  const [searchResults, setSearchResults] = useState<object[]>([]);
  return (
    <Modal open={visibility} onClose={() => { setVisibility(false) }}>
      <ModalDialog size='lg' sx={{ backgroundColor: 'background.body' }}>
        <Input size='md' placeholder="Search" startDecorator={<SearchRounded color="primary" />} onChange={(e) => {
          setSearchResults(fuzzyFinder.search(e.target.value))
        }} />
        <List
          component="nav"
          sx={{
            width: 650,
            height: 500,
            overflowY: 'auto'
          }}
        >
          {searchResults.length > 0 ? searchResults.map((e: any, i: number) => (
            <ListItemButton key={i} sx={{ borderRadius: 5, marginY: 0.3 }}>
              {dataToBeDisplayed(e)}
            </ListItemButton>
          )) : <Typography>
            Placeholder
          </Typography>}
        </List>
      </ModalDialog>
    </Modal>
  )
}
