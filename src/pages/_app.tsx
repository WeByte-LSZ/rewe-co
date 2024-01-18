import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  CssVarsProvider,
  ListItemDecorator,
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
  Videocam,
} from "@mui/icons-material";
import Navigation from "@/components/Header";
import theme from "@/theme";
import Sidebar from "@/components/Sidebar";
import BreadCrumbs from "@/components/Breadcrumbs";
import SearchModal from "@/components/modal/SearchModal";

export default function App({ Component, pageProps }: AppProps) {
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);

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
      <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <Sidebar
          icon={<HexagonSharp />}
          width={sidebarWidth}
          title={"Framework"}
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
            setModalVisibility={() => { setModalVisibility(true) }}
          />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              position: "relative",
              justifyContent: "center",
              overflow: 'auto'
            }}
          >
            <Box
              sx={{
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
              <Component {...pageProps} />
            </Box>
          </Box>
        </Box>
      </Box>

      <SearchModal title="Search"
        visibility={modalVisibility}
        setVisibility={setModalVisibility}
        dataPoints={[{ id: 'nigga' },
        { id: 'elem1' },
        { id: 'elem2' },
        { id: 'elem3' },
        { id: 'elem4' },
        { id: 'elem5' },
        { id: 'elem6' },
        { id: 'elem7' },
        { id: 'elem8' },
        { id: 'elem9' },
        { id: 'elem10' },
        { id: 'elem11' },
        { id: 'elem12' },
        ]}
        setDatapoints={() => { }}
        keys={['id']}
        setKeys={() => { }}
        dataToBeDisplayed={(e: any) => (
          <>
            <ListItemDecorator>
              <Videocam />
            </ListItemDecorator>
            {e.item.id}
          </>
        )} />
    </CssVarsProvider>
  );
}
