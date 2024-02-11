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
  Sheet,
  Stack,
  Typography,
  listItemButtonClasses,
} from "@mui/joy";
import Link from "next/link";
import DrawerItem, { DrawerPage } from "@/types/Drawer";
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

const TitleComponent = ({ title, icon, closeSidebar }: { title: string, icon: JSX.Element, closeSidebar: Function }) => (
  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
      <IconButton onClick={() => closeSidebar()}>
        <CloseSharp />
      </IconButton>
    </Box>
  </Box>
)

const NestedListComponent = ({ items }: { items: DrawerPage[] }) => {
  return items.map((e, i) => {
    if (e.subItems.length > 0) return (
      <Toggler key={i} renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          {e.icon}
          <ListItemContent>
            <Typography level="title-sm">{e.label}</Typography>
          </ListItemContent>
          <KeyboardArrowDown
            sx={{ transform: open ? "none" : "rotate(180deg)" }}
          />
        </ListItemButton>
      )}>
        <List
          size="sm"
          sx={{
            gap: 0.5,
          }}>

          <ListItem nested>
            <NestedListComponent items={e.subItems} />
          </ListItem>
        </List>
      </Toggler >
    )
    return (
      <ListItem key={i}>
        <ListItemButton>
          {e.icon}
          <ListItemContent>
            <Typography level="title-sm">{e.label}</Typography>
          </ListItemContent>
        </ListItemButton>
      </ListItem>
    )
  })
}

function MainComponent({
  title,
  icon,
  width,
  drawerItems,
  setVisibility,
}: {
  title: string;
  width: number;
  icon: JSX.Element;
  drawerItems: DrawerItem[];
  setVisibility: Function
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
      <TitleComponent title={title} icon={icon} closeSidebar={() => setVisibility(false)} />
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
            "--List-nestedInsetStart": "15px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}>
          {
            drawerItems.map((e, i) => (
              <ListItem key={i} nested>
                <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
                  {e.label}
                </ListSubheader>
                <NestedListComponent items={e.subItems} />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Sheet >
  );
}

export default function Sidebar({
  title,
  width,
  icon,
  drawerItems,
  visibilityState,
  setVisibility,
}: {
  title: string;
  width: number;
  icon: JSX.Element;
  drawerItems: DrawerItem[];
  visibilityState: boolean;
  setVisibility: Function;
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
          setVisibility={setVisibility}
        />
      </Box>
    </>
  );
}
