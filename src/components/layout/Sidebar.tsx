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
import { Clear, CloseSharp } from "@mui/icons-material";
import { useDrag } from "react-dnd";
import { DropLocation } from "./LayoutProvider";
import ReportProvider from "./Report";

const TitleComponent = ({
  title,
  icon,
  closeSidebar,
}: {
  title: string;
  icon: JSX.Element;
  closeSidebar: Function;
}) => (
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
    <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
      <IconButton onClick={() => closeSidebar()}>
        <CloseSharp />
      </IconButton>
    </Box>
  </Box>
);

export const dragableItemId = "dragable-sidebar-item";

const Item = ({
  drawerItems,
  setDrawerItems,
  label,
  icon,
  id,
  currentPageID,
  setCurrentPageID,
  setContent,
  content,
}: {
  drawerItems: DrawerItem[];
  setDrawerItems: Function;
  label: string;
  icon: JSX.Element;
  id: string;
  currentPageID: string;
  setCurrentPageID: Function;
  setContent: Function;
  content: JSX.Element[];
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragableItemId,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropLocation>()
      if (dropResult && dropResult.accepted) {
        setContent((old: JSX.Element[]) => [...old, <ReportProvider timestamp={currentPageID} setContent={setContent} content={content} index={content.length - 1} key={`item-${item.id}`} />
        ])
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (<ListItem ref={drag}>
    <ListItemButton sx={{ backgroundColor: id == currentPageID ? 'background.level2' : '' }} onClick={() => { setCurrentPageID(id) }}>
      {icon}
      <ListItemContent>
        <Typography level="title-sm">{label}</Typography>
      </ListItemContent>
    </ListItemButton>
    <IconButton
      size="sm"
      onClick={() => {
        fetch(`/api/deleteTimestamp?timestamp=${label}`, {
          method: "DELETE",
        }).then((res) => {
          let drawerWithoutId = drawerItems.filter((e) => e.id !== id);
          setDrawerItems(drawerWithoutId);
        });
      }}
    >
      <Clear />
    </IconButton>
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
  currentPageID,
  setCurrentPageID,
  setDrawerItems,
}: {
  title: string;
  width: number;
  icon: JSX.Element;
  drawerItems: DrawerItem[];
  setVisibility: Function;
  content: JSX.Element[];
  currentPageID: string;
  setCurrentPageID: Function
  setContent: Function;
  setDrawerItems: Function;
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
      <TitleComponent
        title={title}
        icon={icon}
        closeSidebar={() => setVisibility(false)}
      />
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
          }}
        >
          {drawerItems.map((e, i) => (
            <Item
              key={`sidebar-item-${i}`}
              drawerItems={drawerItems}
              setDrawerItems={setDrawerItems}
              setCurrentPageID={setCurrentPageID}
              label={e.label}
              id={e.id}
              icon={e.icon}
              currentPageID={currentPageID}
              setContent={setContent}
              content={content}
            />
          ))}
        </List>
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
  currentPageID,
  setCurrentPageID,
  content,
  setContent,
  setDrawerItems,
}: {
  title: string;
  width: number;
  icon: JSX.Element;
  drawerItems: DrawerItem[];
  visibilityState: boolean;
  setVisibility: Function;
  currentPageID: string;
  setCurrentPageID: Function;
  content: JSX.Element[];
  setContent: Function;
  setDrawerItems: Function;
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
          currentPageID={currentPageID}
          content={content}
          setContent={setContent}
          setDrawerItems={setDrawerItems}
        />
      </Box>
    </>
  );
}
