import { Box } from "@mui/joy"
import { useDrop } from "react-dnd"
import { dragableItemId } from "./Sidebar"
import { Children } from "react";

export type DropLocation = {
  name: string;
  accepted: boolean;
}

export default function LayoutProvider({ name, children }: { name: string, children: React.ReactNode }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: dragableItemId,
    drop: () => ({ name: name, accepted: Children.count(children) < 4 }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <Box ref={drop} sx={{
      display: 'flex',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      flexGrow: 1,
      flexDirection: 'row',
      gap: 10
    }}>
      {children}
    </Box>
  )
}
