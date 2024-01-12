import * as React from "react";
import {
  InfoSharp,
  LanguageSharp,
  MenuRounded,
  SearchRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { Box, IconButton, Input, Stack, Typography } from "@mui/joy";

export default function Navbar({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: Function;
}) {
  return (
    <Box
      sx={{
        zIndex: 900,
        width: "100%",
        display: "flex",
        position: "sticky",
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
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search..."
          startDecorator={<SearchRounded color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: "background.level1" }}
            >
              <Typography level="title-sm" textColor="text.icon">
                Ctrl + K
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: "center",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
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
      </Stack>
    </Box>
  );
}
