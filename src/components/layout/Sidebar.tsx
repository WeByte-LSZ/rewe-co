import * as React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListSubheader,
  Sheet,
  Typography,
  listItemButtonClasses,
} from "@mui/joy";
import DrawerItem from "@/types/Drawer";
import { CloseSharp, KeyboardArrowDown } from "@mui/icons-material";

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

const Item = ({ label, icon, id, setCurrentPageID }: { label: string; icon: JSX.Element; id: string; setCurrentPageID: Function }) => (
  <ListItem>
    <ListItemButton onClick={() => { setCurrentPageID(id) }}>
      {icon}
      <ListItemContent>
        <Typography level="title-sm">{label}</Typography>
      </ListItemContent>
    </ListItemButton>
  </ListItem>
)

function MainComponent({
  title,
  icon,
  width,
  drawerItems,
  setVisibility,
  setCurrentPageID
}: {
  title: string;
  width: number;
  icon: JSX.Element;
  drawerItems: DrawerItem[];
  setVisibility: Function;
  setCurrentPageID: Function
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
                <Item setCurrentPageID={setCurrentPageID} label={e.label} id={e.id} icon={e.icon} />
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
  setCurrentPageID
}: {
  title: string;
  width: number;
  icon: JSX.Element;
  drawerItems: DrawerItem[];
  visibilityState: boolean;
  setVisibility: Function;
  setCurrentPageID: Function;
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
          setCurrentPageID={setCurrentPageID}
        />
      </Box>
    </>
  );
}
