import * as React from 'react';
import { Modal, ModalDialog, List, Typography } from "@mui/joy";
import Button from '@mui/joy/Button';

interface ModalProps {
  visibility: boolean;
  setVisibility: Function;
}

export default function SettingsModal({ visibility, setVisibility }: ModalProps) {

  return (
    <Modal open={visibility} onClose={() => { setVisibility(false) }}>
      <ModalDialog size='lg' sx={{ backgroundColor: 'background.body' }}>
        <List
          component="nav"
          sx={{
            width: 650,
            height: 500,
            overflowY: 'auto'
          }}
        >
          <Typography>
            <h2>Layout-Breite verändern</h2>
            <Button onClick={() => React.useEffect}>Layout Breite wechseln</Button>
          </Typography>
        </List>
      </ModalDialog>
    </Modal>
  )
}
