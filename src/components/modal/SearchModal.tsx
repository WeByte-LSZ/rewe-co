import { SearchRounded } from "@mui/icons-material";
import { Button, Grid, Input, List, ListItemButton, Modal, ModalDialog, Typography } from "@mui/joy";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
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

const modalItems = [
  { title: 'heading 1', items: ['Button 1', 'Button 2', 'Button 3'] },
  { title: 'heading 2', items: ['Button 1', 'Button 2', 'Button 3'] },
  { title: 'heading 3', items: ['Button 1', 'Button 2', 'Button 3'] },
  { title: 'heading 4', items: ['Button 1', 'Button 2', 'Button 3'] }
]

function SearchResultItem({ Item }: { Item: JSX.ElementType }) {
  const [hover, setHover] = useState(false);
  return (
    <ListItemButton
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      sx={{
        display: 'flex', fontWeight: 450, borderRadius: 8, marginY: 0.3, padding: 1.5,
        backgroundColor: 'background.surface', borderColor: 'neutral.outlinedBorder'
      }} variant="plain" color="primary">
      <Item isHovered={hover} />
    </ListItemButton>
  )
}

export default function SearchModal({ visibility, setVisibility, dataPoints, keys, dataToBeDisplayed }: PropsWithChildren<ModalProps>) {
  let fuzzyFinder = useRef<FuzzyFinder | null>(null);
  const [searchResults, setSearchResults] = useState<object[]>([]);
  const [query, setQuery] = useState<string>("")

  useEffect(() => {
    fuzzyFinder.current = new FuzzyFinder(dataPoints, keys);
  }, [dataPoints, keys])

  return (
    <Modal open={visibility} onClose={() => { setVisibility(false) }}>
      <ModalDialog size='lg' sx={{ backgroundColor: 'background.body' }}>
        <Input size='md' placeholder="Search" value={query} startDecorator={<SearchRounded color="primary" />} onChange={(e) => {
          setQuery(e.target.value);
          setSearchResults(fuzzyFinder.current?.search(query) || [])
        }} />
        <List
          component="nav"
          sx={{
            width: 650,
            height: 500,
            overflowY: 'auto'
          }}
        >
          {searchResults.length > 0 && query.length != 0 ? searchResults.map((e: any, i: number) => {
            return (
              <SearchResultItem Item={({ isHovered }: { isHovered: boolean }) => dataToBeDisplayed(e, isHovered)} key={i} />
            )
          }) : (
            <Grid container rowSpacing={2} sx={{ maxWidth: '100%' }}>
              {modalItems.map((e, i) => (
                <Grid key={e.title + i} xs={12} sm={6} sx={{
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: 'column',
                  rowGap: 1,
                  paddingLeft: i % 2 == 1 ? 0.5 : 0,
                  paddingRight: i % 2 == 1 ? 0 : 0.5
                }}>
                  <Typography>
                    {e.title}
                  </Typography>
                  {
                    e.items.map((f, j) => (
                      <Button key={f + j}
                        sx={{
                          display: 'flex', flexGrow: 1, fontWeight: 450, borderRadius: 8,
                          padding: 1.5, backgroundColor: 'background.surface', borderColor: 'neutral.outlinedBorder'
                        }}
                        variant="plain" color="primary">{f}</Button>
                    ))}
                </Grid>
              ))}
            </Grid>
          )}
        </List>
      </ModalDialog>
    </Modal>
  )
}
