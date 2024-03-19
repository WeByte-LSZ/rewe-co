import * as React from "react";
import {
  BuildSharp,
  InfoSharp,
  LanguageSharp,
  MenuRounded,
  SearchRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { Box, IconButton, Link, Stack } from "@mui/joy";

import ColorSchemeToggle from "../utils/ColorSchemeToggle";
import config from "../../../configuration";
import StyledTooltip from "../styledComponents/StyledTooltip";

export default function Navbar({
  sidebarVisibility,
  toggleSidebarVisibility,
  toggleSearchModalVisibility,
  toggleActionModalVisibility,
  toggleInformationModalVisibility,
  toggleSettingsModalVisibility
}: {
  sidebarVisibility: boolean;
  toggleSearchModalVisibility: Function;
  toggleSidebarVisibility: Function;
  toggleActionModalVisibility: Function;
  toggleInformationModalVisibility: Function;
  toggleSettingsModalVisibility: Function;
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
        <StyledTooltip title="Toggle sidebar">
          <IconButton
            variant={sidebarVisibility ? "plain" : "soft"}
            color="neutral"
            onClick={() => {
              toggleSidebarVisibility();
            }}
          >
            <MenuRounded />
          </IconButton>
        </StyledTooltip>

        <StyledTooltip title="Search for pages">
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
        </StyledTooltip>

        <StyledTooltip title="Perform Actions">
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{
              alignSelf: "center",
            }}
            onClick={() => {
              toggleActionModalVisibility()
            }}
          >
            <BuildSharp />
          </IconButton>
        </StyledTooltip>

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
        <IconButton variant="plain" color="neutral" onClick={() => { toggleSettingsModalVisibility() }}>
          <SettingsRounded sx={{ '&:hover': { rotate: '360deg' }, transition: 'rotate 1s' }} />
        </IconButton>
        <ColorSchemeToggle />
      </Stack>
    </Box>
  );
}
