import * as React from "react";
import {
  InfoSharp,
  LanguageSharp,
  MenuRounded,
  SearchRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { Box, Dropdown, IconButton, Link, Menu, MenuButton, MenuItem, Stack } from "@mui/joy";

import ColorSchemeToggle from "../utils/ColorSchemeToggle";
import config from "../../../configuration";

export default function Navbar({
  sidebarVisibility,
  toggleSidebarVisibility,
  toggleSearchModalVisibility,
  toggleInformationModalVisibility
}: {
  sidebarVisibility: boolean;
  toggleSearchModalVisibility: Function;
  toggleSidebarVisibility: Function;
  toggleInformationModalVisibility: Function
}) {
  React.useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key === "k") {
        toggleSearchModalVisibility();
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSearchModalVisibility]);

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
            toggleSidebarVisibility();
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
          onClick={() => {
            toggleSearchModalVisibility();
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
        <Link href={config.userConfiguration.homepageLink} style={{ display: config.userConfiguration.homepageLink ? 'inline-flex' : 'none' }} >
          <IconButton variant="plain" color="neutral">
            <LanguageSharp />
          </IconButton>
        </Link>
        <IconButton variant="plain" color="neutral" onClick={() => { toggleInformationModalVisibility() }} >
          <InfoSharp />
        </IconButton>
        <IconButton variant="plain" color="neutral">
          <SettingsRounded sx={{ '&:hover': { rotate: '360deg' }, transition: 'rotate 1s' }} />
        </IconButton>
        <ColorSchemeToggle />
      </Stack>
    </Box>
  );
}
