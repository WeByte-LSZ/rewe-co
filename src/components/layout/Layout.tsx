import * as React from "react";
import {
  Box,
} from "@mui/joy";
import { useEffect, useState } from "react";
import Navigation from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import BreadCrumbs from "@/components/layout/Breadcrumbs";
import DrawerItem from "@/types/Drawer";
import config from "../../../configuration";
import InformationModal from "../modal/InformationModal";
import SettingsModal from "../modal/SettingsModal";
import { ThemesInterface } from "@/pages/_app";
import LayoutProvider from "./LayoutProvider";

export default function Layout({ sidebarData, toggleSearchModalVisibility, toggleActionModalVisibility, breadcrumbsPath, currentPageID, setCurrentPageID, setTheme, theme, themes , setDrawerItems}: { sidebarData: DrawerItem[], toggleSearchModalVisibility: Function, toggleActionModalVisibility: Function, breadcrumbsPath: string[], currentPageID: string; setCurrentPageID: Function, setTheme: Function; theme: keyof ThemesInterface; themes: ThemesInterface, setDrawerItems: Function; }) {

  const sidebarWidth = '300px';
  const [sidebarVisibility, setSidebarVisibility] = useState<boolean>(true);
  const [informationModalVisible, setInformationModalVisibility] = useState<boolean>(false);
  const [settingsModalVisibility, setSettingsModalVisibility] = useState<boolean>(false);
  // in %
  const [layoutWidth, setLayoutWidth] = useState<number>(config.userConfiguration.defaultLayoutWidth || 75);
  const [content, setContent] = useState<JSX.Element[]>([])

  useEffect(() => {
    setContent([<h1 key={`item-${currentPageID}`}>{currentPageID}</h1>])
  }, [currentPageID])


  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <Sidebar
          icon={config.logo}
          width={300}
          title={config.sidebarTitle}
          visibilityState={sidebarVisibility}
          setVisibility={setSidebarVisibility}
          drawerItems={sidebarData}
          currentPageID={currentPageID}
          setCurrentPageID={setCurrentPageID}
          content={content}
          setContent={setContent}
          setDrawerItems={setDrawerItems}
        />
        <Box
          sx={{
            marginLeft: {
              xs: 0,
              md: sidebarVisibility ? sidebarWidth : 0,
            },
            transition: "all 0.5s",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Navigation
            sidebarVisibility={sidebarVisibility}
            toggleSidebarVisibility={() => {
              setSidebarVisibility((old) => !old);
            }}
            toggleSettingsModalVisibility={() => { setSettingsModalVisibility((old) => !old) }}
            toggleSearchModalVisibility={toggleSearchModalVisibility}
            toggleActionModalVisibility={toggleActionModalVisibility}
            toggleInformationModalVisibility={() => {
              setInformationModalVisibility((old) => !old)
            }}
          />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              position: "relative",
              justifyContent: "center",
              overflow: 'auto',
              flexGrow: 1
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexBasis: `${layoutWidth}%`,
              }}
            >
              <BreadCrumbs path={breadcrumbsPath} />
              <LayoutProvider name={"Drag"}>
                {content.map((e, i) => (
                  <Box key={`flex-wrapper-content-${i}`} sx={{ display: 'flex', flexWrap: 'wrap', flexGrow: 1 }}>
                    {e}
                  </Box>
                ))}
              </LayoutProvider>
            </Box>
          </Box>
        </Box>
      </Box>
      <InformationModal modalVisible={informationModalVisible} setModalVisible={setInformationModalVisibility} />
      <SettingsModal visibility={settingsModalVisibility} setVisibility={setSettingsModalVisibility} setLayoutWidth={(n: number) => setLayoutWidth(n)} layoutWidth={layoutWidth} setTheme={setTheme} theme={theme} themes={themes} />
    </>
  )
}
