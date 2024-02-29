import * as React from 'react';
import { Modal, ModalDialog, List, Typography } from "@mui/joy";
import Slider from '@mui/joy/Slider';
import { Grid } from '@mui/material';

interface ModalProps {
  visibility: boolean;
  setVisibility: Function;
  toggleWidth: Function;
  layoutWidth: number;
}

export default function SettingsModal({ visibility, setVisibility, toggleWidth, layoutWidth }: ModalProps) {

  const handleChange = (newValue: number | number[]) => {
    toggleWidth(newValue as number);
  };

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
            <h2>Optionen</h2>
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
               <h3>Titel-Seitenabstand</h3>
              <Grid item xs={10}>
              <Slider
                value={layoutWidth}
                min={50}
                max={100}
                step={5}
                onChange={(event, value) => handleChange(value)}
                onChangeCommitted={(event, value) => handleChange(value)}
                aria-labelledby="layout-width-slider"
                valueLabelDisplay="auto"
                sx={{ width: '100%' }}
              />
              </Grid>
            </Grid>
          </Typography>
        </List>
      </ModalDialog>
    </Modal>
  )
}
