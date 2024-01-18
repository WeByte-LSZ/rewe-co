import * as React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListSubheader,
  Modal,
  Sheet,
  Stack,
  Typography,
  listItemButtonClasses,
} from "@mui/joy";
import Link from "next/link";
import DrawerItem from "@/types/DrawerItem";
import { CloseSharp, KeyboardArrowDown } from "@mui/icons-material";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
      open: boolean;
      setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
  }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}

function MainComponent({
  title,
  icon,
  width,
  drawerItems,
  aboutTitle,
  aboutDescription,
  setVisibility,
}: {
    title: string;
    width: number;
    icon: JSX.Element;
    drawerItems: DrawerItem[];
    aboutTitle: string;
    aboutDescription: string;
    setVisibility : Function
  }) {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        display: "flex",
        height: "100vh",
        width: `${width}px`,
        padding: 2,
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.surface",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center"}}>
        <IconButton variant="soft" color="primary" size="sm">
          {icon}
        </IconButton>
        <Typography
          level="title-lg"
          sx={{ fontSize: "1.25em", fontFamily: "YoungSerif-Regular" }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
       <IconButton onClick={() => setVisibility(false)}>
          <CloseSharp />
        </IconButton>
        </Box>
       </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {drawerItems.map((e, i) => (
            <ListItem nested key={i}>
              <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
                {e.label}
              </ListSubheader>
              {e.data.map((f, j) => {
                if (f.container)
                return (
                  <Toggler
                    key={j}
                    renderToggle={({ open, setOpen }) => (
                      <ListItemButton onClick={() => setOpen(!open)}>
                        {f.icon}
                        <ListItemContent>
                          <Typography level="title-sm">{f.text}</Typography>
                        </ListItemContent>
                        <KeyboardArrowDown
                          sx={{ transform: open ? "none" : "rotate(180deg)" }}
                        />
                      </ListItemButton>
                    )}
                  >
                    <List sx={{ gap: 0.5 }}>
                      {f.data.map((g, k) => (
                        <ListItem key={k}>
                          <Link
                            href={g.path}
                            style={{ textDecoration: "none", width: "100%" }}
                          >
                            <ListItemButton>
                              {g.icon}
                              <ListItemContent>
                                <Typography level="title-sm">
                                  {g.text}
                                </Typography>
                              </ListItemContent>
                            </ListItemButton>
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Toggler>
                );
                return (
                  <ListItem key={i}>
                    <Link
                      href={f.path}
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <ListItemButton>
                        {f.icon}
                        <ListItemContent>
                          <Typography level="title-sm">{f.text}</Typography>
                        </ListItemContent>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Card
          variant="soft"
          color="success"
          size="sm"
          sx={{ boxShadow: "none" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography level="title-sm">{aboutTitle}</Typography>
          </Stack>
          <Typography level="body-xs">{aboutDescription}</Typography>
          <Button size="sm" variant="solid">
            Project Team
          </Button>
        </Card>
      </Box>
    </Sheet>
  );
}

export default function Sidebar({
  title,
  width,
  icon,
  drawerItems,
  visibilityState,
  setVisibility,
  aboutTitle,
  aboutDescription,
}: {
    title: string;
    width: number;
    icon: JSX.Element;
    drawerItems: DrawerItem[];
    visibilityState: boolean;
    setVisibility: Function;
    aboutTitle: string;
    aboutDescription: string;
  }) {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          transition: "all 0.5s",
          transform: visibilityState ? "" : `translateX(-${width}px)`,
          zIndex: 1000,
        }}
      >
        <MainComponent
          title={title}
          width={width}
          icon={icon}
          drawerItems={drawerItems}
          aboutTitle={aboutTitle}
          aboutDescription={aboutDescription}
          setVisibility={setVisibility}
        />
      </Box>
    </>
  );
}
