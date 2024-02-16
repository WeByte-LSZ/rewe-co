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

export default function Layout({ sidebarData, toggleSearchModalVisibility, breadcrumbsPath, content, setCurrentPageID }: { sidebarData: DrawerItem[], toggleSearchModalVisibility: Function, breadcrumbsPath: string[], content: JSX.Element, setCurrentPageID: Function }) {

  const sidebarWidth = '300px';
  const [sidebarVisibility, setSidebarVisibility] = useState<boolean>(true);
  const [informationModalVisible, setInformationModalVisible] = useState<boolean>(false);
  // in %
  const [layoutWidth, setLayoutWidth] = useState<number>(config.userConfiguration.defaultLayoutWidth || 75);

  // @TODO Implement layoutWidth caching
  useEffect(() => {

  }, [])

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
          setCurrentPageID={setCurrentPageID}
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
            toggleSearchModalVisibility={toggleSearchModalVisibility}
            toggleInformationModalVisibility={() => {
              setInformationModalVisible((old) => !old)
            }}
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
                flexBasis: `${layoutWidth}%`,
              }}
            >
              <BreadCrumbs path={breadcrumbsPath} />
              {content}
            </Box>
          </Box>
        </Box>
      </Box>
      <InformationModal modalVisible={informationModalVisible} setModalVisible={setInformationModalVisible} />
    </>
  )
}
