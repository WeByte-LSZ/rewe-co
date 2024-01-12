import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  CssVarsProvider,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import {
  BarChartSharp,
  DownloadRounded,
  HexagonSharp,
  SummarizeSharp,
} from "@mui/icons-material";
import Navigation from "@/components/Header";
import theme from "@/theme";
import Sidebar from "@/components/Sidebar";
import BreadCrumbs from "@/components/Breadcrumbs";

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarVisibility, setSidebarVisibility] = useState(true);

  const drawerItems = [
    {
      label: "Dashboards",
      data: [
        {
          text: "General",
          path: "charts",
          icon: <SummarizeSharp />,
          container: false,
          data: [],
        },
        {
          text: "Analytical",
          path: "components",
          icon: <BarChartSharp />,
          container: false,
          data: [],
        },
      ],
    },
  ];

  const [path, setPath] = useState(
    usePathname()
      .split("/")
      .splice(1)
      .map((e) => {
        e = e.replace("-", " ");
        let words = e.split(" ");
        let url = "";
        words.forEach((word) => {
          url += word.at(0)?.toUpperCase() + word.slice(1) + " ";
        });
        return url;
      }),
  );

  const sidebarWidth = 300

  return (
    <CssVarsProvider disableTransitionOnChange theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "row", Height: "100vh" }}>
        <Sidebar
          icon={<HexagonSharp />}
          width={sidebarWidth}
          title={"DataVis Framework"}
          visibilityState={sidebarVisibility}
          setVisibility={setSidebarVisibility}
          drawerItems={drawerItems}
          aboutTitle={"About DataVis"}
          aboutDescription={
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
          }
        />
        <Box
          sx={{
            marginLeft: {
              xs: 0,
              md: sidebarVisibility ? `${sidebarWidth}px` : 0, 
            }, 
            transition: "all 0.5s",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Navigation
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={() => {
              setSidebarVisibility(() => !sidebarVisibility);
            }}
          />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              position: "relative",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                flexBasis: "75%",
              }}
            >
              <BreadCrumbs path={path} />
              <Box
                sx={{
                  display: "flex",
                  my: 1,
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "start", sm: "center" },
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Typography level="h2">{path[path.length - 1]}</Typography>
                <Button
                  color="primary"
                  startDecorator={<DownloadRounded />}
                  size="sm"
                >
                  Export
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
