import Head from "next/head";
import * as React from "react";
import {
  Box,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import {
  KeyboardReturn, ReportSharp,
} from "@mui/icons-material";
import SearchModal from "@/components/modal/SearchModal";
import config from "@/../configuration"
import DrawerItem, { DrawerPage } from "@/types/Drawer";
import Layout from "@/components/layout/Layout";
import { FuseResult, RangeTuple } from "fuse.js";
import { ThemesInterface } from "./_app";

interface PageContents {
  [id: string]: JSX.Element
}

function prepareDrawerAndSidebar(pages: string[], modalData: { data: object[] }, drawerData: { data: DrawerItem[] }) {
  return pages.map((e) => {
    modalData.data.push({ id: e, icon: <ReportSharp /> })
    drawerData.data.push({ label: e, id: e, icon: <ReportSharp /> })
  })
}

function underlineSearchResults(match: string, indices: readonly RangeTuple[]): (JSX.Element | string)[] {
  let res: (JSX.Element | string)[] = [match];
  let startIndex = 0
  indices.forEach((range) => {
    let start = match.substring(startIndex, range[0]);
    startIndex = range[1] + 1;
    let end = match.substring(startIndex);
    let center = <Typography sx={{ textDecoration: 'underline' }} color='primary'>{match.substring(range[0], range[1] + 1)}</Typography>;
    res[res.length - 1] = start;
    res.push(center);
    res.push(end)
  })
  return res
}

export default function Home({ setTheme, theme, themes }: { setTheme: Function; theme: keyof ThemesInterface; themes: ThemesInterface }) {
  const [modalData, setModalData] = useState<Object[]>([]);
  const [sidebarData, setSidebarData] = useState<DrawerItem[]>([]);
  const [modalVisibility, setSearchModalVisibility] = useState(false);
  const [currentPageID, setCurrentPageID] = useState('');
  const [pageContentStore, setPageContentStore] = useState<PageContents>({});

  useEffect(() => {
    let modalRef: { data: Object[] } = { data: [] };
    let sidebarRef: { data: DrawerItem[] } = { data: [] };


    fetch("/api/getTimestamps").then((e) => e.json()).then((e: { data: string[] }) => {
    prepareDrawerAndSidebar(e.data, modalRef, sidebarRef)
    console.log(e.data)
    setModalData(modalRef.data)
    setSidebarData(sidebarRef.data)
    })
  }, [])

  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout
          sidebarData={sidebarData}
          toggleSearchModalVisibility={() => { setSearchModalVisibility((old) => !old) }}
          breadcrumbsPath={currentPageID.split('/')}
          content={pageContentStore[currentPageID]}
          setCurrentPageID={setCurrentPageID}
          toggleActionModalVisibility={() => { }}
          setTheme={setTheme}
          theme={theme}
          themes={themes}
        />

        <SearchModal title="Search"
          visibility={modalVisibility}
          setVisibility={setSearchModalVisibility}
          dataPoints={modalData}
          setCurrentPageID={(id: string) => { setCurrentPageID(id) }}
          setDatapoints={() => { }}
          keys={['id']}
          setKeys={() => { }}
          dataToBeDisplayed={(e: FuseResult<any>, isHovered: boolean) => (
            <>
              <ListItemDecorator sx={{ justifyContent: 'flex-start' }}>
                {e.item.icon}
              </ListItemDecorator>
              {
                <Typography sx={{ color: isHovered ? 'primary.plainColor' : 'text.primary' }}>
                  {underlineSearchResults(e.item.id, (e.matches) ? e.matches[0].indices : [])}
                </Typography>
              }
              <ListItemDecorator sx={{ display: isHovered ? 'inline-flex' : 'none', justifyContent: 'flex-end', flexGrow: 1, paddingX: 1.5 }}>
                <KeyboardReturn />
              </ListItemDecorator>
            </>
          )} />
      </main>
    </>
  );
}
