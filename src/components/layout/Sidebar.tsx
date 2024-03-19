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
import { useDrag } from 'react-dnd'
import { DropLocation } from "./LayoutProvider";

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

export const dragableItemId = "dragable-sidebar-item"

const Item = ({ label, icon, id, setCurrentPageID, setContent, content }: { label: string; icon: JSX.Element; id: string; setCurrentPageID: Function, setContent: Function, content: JSX.Element[] }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragableItemId,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropLocation>()
      if (item && dropResult && dropResult.accepted) {
        setContent([
          <h1 key={`item-${id}`}>{id}</h1 >,
          ...content
        ])
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  return (<ListItem ref={drag}>
    <ListItemButton onClick={() => { setCurrentPageID(id); console.log("clicked") }}>
      {icon}
      <ListItemContent>
        <Typography level="title-sm">{label}</Typography>
      </ListItemContent>
    </ListItemButton>
  </ListItem>)
}

function MainComponent({
  title,
  icon,
  width,
  drawerItems,
  setVisibility,
  content,
  setContent,
  setCurrentPageID
}: {
  title: string;
  width: number;
  icon: JSX.Element;
  drawerItems: DrawerItem[];
  setVisibility: Function;
  setContent: Function;
  content: JSX.Element[];
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
              <Item key={`sidebar-item-${i}`} setCurrentPageID={setCurrentPageID} label={e.label} id={e.id} icon={e.icon} setContent={setContent} content={content} />
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
  setCurrentPageID,
  content,
  setContent
}: {
  title: string;
  width: number;
  icon: JSX.Element;
  drawerItems: DrawerItem[];
  visibilityState: boolean;
  setVisibility: Function;
  setCurrentPageID: Function;
  content: JSX.Element[]
  setContent: Function;
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
          content={content}
          setContent={setContent}
        />
      </Box>
    </>
  );
}
