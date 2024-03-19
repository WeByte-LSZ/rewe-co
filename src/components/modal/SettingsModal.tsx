import * as React from 'react';
import { Typography, ModalClose, AccordionGroup, accordionDetailsClasses, accordionSummaryClasses, AccordionSummary, Accordion, Avatar, ListItemContent, FormControl, FormLabel, Switch, AccordionDetails, Stack, DialogTitle, Drawer, DialogContent, Button, CardOverflow, Card, CardContent, AspectRatio, Divider, Box, Grid } from "@mui/joy";
import { AirplanemodeActiveRounded, FontDownloadSharp, WaterDrop, WidthNormal } from '@mui/icons-material';
import { ThemesInterface } from '@/pages/_app';

interface ModalProps {
  visibility: boolean;
  setVisibility: Function;
  layoutWidth: number;
  setLayoutWidth: Function;
  setTheme: Function;
  theme: keyof ThemesInterface;
  themes: ThemesInterface;
}

interface SettingsModalContent {
  title: string;
  description: string;
  icon: JSX.Element;
  color: "primary" | "danger" | "success" | "warning";
  content: Function
}

const settings: SettingsModalContent[] = [
  {
    title: "Theme",
    description: "Change your color scheme",
    color: "primary",
    icon: <WaterDrop />,
    content: () => (<Stack spacing={1.5}>
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
    </Stack>)
  },
  {
    title: "Layout Behaivour",
    description: "Change width of the main layout",
    color: "warning",
    icon: <WidthNormal />,
    content: () => (<Stack spacing={1.5}>
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
    </Stack>)
  },
  {
    title: "Font",
    description: "Change the default color scheme",
    color: "danger",
    icon: <FontDownloadSharp />,
    content: ({ theme: theme, themes: themes, setTheme: setTheme }: {
      setTheme: Function;
      theme: keyof ThemesInterface;
      themes: ThemesInterface
    }) => {
      return (
        <Stack>
          <Grid gap={1} container sx={{ flexGrow: 1 }}>
            {
              Object.keys(themes).map((key, i) => {
                return (
                  <Grid columnGap={1} sx={{ flexGrow: 1 }} key={`theme-switch-button-${i}`}>
                    <div onClick={() => { setTheme(key) }}>
                      <Box sx={{ height: 100, width: 100, flexGrow: 1, flexDirection: 'row', backgroundColor: themes[key].palette.primary['400'] }}>
                        {key}
                      </Box>
                    </div>
                  </Grid>
                )
              })
            }
          </Grid >
        </Stack >
      )
    }
  }


]

export default function SettingsModal({ visibility, setVisibility, layoutWidth, setLayoutWidth, setTheme, theme, themes }: ModalProps) {
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
                  <Avatar color={e.color}>
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
                  {e.content({ theme: theme, themes: themes, setTheme: setTheme })}
                </AccordionDetails>
              </Accordion>
            ))
          }
        </AccordionGroup>
      </DialogContent>
    </Drawer>
  )
}
