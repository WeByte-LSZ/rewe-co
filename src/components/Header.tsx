import * as React from "react";
import {
  InfoSharp,
  LanguageSharp,
  MenuRounded,
  SearchRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { Box, IconButton, Input, Stack, Typography } from "@mui/joy";
import ColorSchemeToggle from "./decorative/ColorSchemeToggle";

export default function Navbar({
  sidebarVisibility,
  setSidebarVisibility,
  setModalVisibility
}: {
  sidebarVisibility: boolean;
  setModalVisibility: Function;
  setSidebarVisibility: Function;
}) {
  React.useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key === "k") {
        setModalVisibility();
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setModalVisibility]);

  return (
    <Box
      sx={{
        zIndex: 900,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "background.surface",
        padding: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <IconButton
          variant={sidebarVisibility ? "plain" : "soft"}
          color="neutral"
          onClick={() => {
            setSidebarVisibility();
          }}
        >
          <MenuRounded />
        </IconButton>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            alignSelf: "center",
          }}
        >
          <SearchRounded />
        </IconButton>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <IconButton variant="plain" color="neutral">
          <LanguageSharp />
        </IconButton>
        <IconButton variant="plain" color="neutral">
          <InfoSharp />
        </IconButton>
        <IconButton variant="plain" color="neutral">
          <SettingsRounded />
        </IconButton>
        <ColorSchemeToggle />
      </Stack>
    </Box>
  );
}
