import * as React from 'react';
import { Modal, ModalDialog, List, Typography, ModalClose, AccordionGroup, accordionDetailsClasses, accordionSummaryClasses, AccordionSummary, Accordion, Avatar, ListItemContent, FormControl, FormLabel, Switch, AccordionDetails, Stack, DialogTitle, Drawer, DialogContent } from "@mui/joy";
import Slider from '@mui/joy/Slider';
import { Grid } from '@mui/material';
import { AirplanemodeActiveRounded, Colorize, WaterDrop, WindowSharp } from '@mui/icons-material';

interface ModalProps {
  visibility: boolean;
  setVisibility: Function;
  layoutWidth: number;
  setLayoutWidth: Function;
}

const settings = [
  {
    title: "Themes",
    description: "Change your color scheme",
    icon: <WaterDrop />,
    content: <Stack spacing={1.5}>
      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Airplane Mode</FormLabel>
        <Switch size="sm" />
      </FormControl>

      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Wi-Fi</FormLabel>
        <Switch size="sm" />
      </FormControl>

      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Bluetooth</FormLabel>
        <Switch size="sm" />
      </FormControl>
    </Stack>
  },
  {
    title: "Themes",
    description: "Change your color scheme",
    icon: <WaterDrop />,
    content: <Stack spacing={1.5}>
      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Airplane Mode</FormLabel>
        <Switch size="sm" />
      </FormControl>

      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Wi-Fi</FormLabel>
        <Switch size="sm" />
      </FormControl>

      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Bluetooth</FormLabel>
        <Switch size="sm" />
      </FormControl>
    </Stack>
  },
  {
    title: "Themes",
    description: "Change your color scheme",
    icon: <WaterDrop />,
    content: <Stack spacing={1.5}>
      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Airplane Mode</FormLabel>
        <Switch size="sm" />
      </FormControl>

      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Wi-Fi</FormLabel>
        <Switch size="sm" />
      </FormControl>

      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
        <AirplanemodeActiveRounded sx={{ mx: 1 }} />
        <FormLabel>Bluetooth</FormLabel>
        <Switch size="sm" />
      </FormControl>
    </Stack>
  }


]

export default function SettingsModal({ visibility, setVisibility, layoutWidth, setLayoutWidth }: ModalProps) {
  return (
    <Drawer size='sm' hideBackdrop anchor='right' open={visibility} onClose={() => { setVisibility(false) }}>
      <ModalClose size='lg' />
      <DialogTitle level='h3'>Settings</DialogTitle>
      <DialogContent>
        <AccordionGroup
          variant="plain"
          transition="0.2s"
          sx={{
            padding: 2,
            borderRadius: 'md',
            [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
            {
              paddingBlock: '1rem',
            },
            [`& .${accordionSummaryClasses.button}`]: {
              paddingBlock: '1rem',
            },
          }}
        >
          {
            settings.map((e, i) => (
              <Accordion key={`settingsModalAccordion-${i}`}>
                <AccordionSummary>
                  <Avatar color="primary">
                    {e.icon}
                  </Avatar>
                  <ListItemContent>
                    <Typography level="body-lg">{e.title}</Typography>
                    <Typography level="body-sm">
                      {e.description}
                    </Typography>
                  </ListItemContent>
                </AccordionSummary>
                <AccordionDetails>
                  {e.content}
                </AccordionDetails>
              </Accordion>
            ))
          }
        </AccordionGroup>
      </DialogContent>
    </Drawer>
  )
}
