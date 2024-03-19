import "@/style/globals.css"
import materialExtended from "@/themes/materialExtended";
import { CssBaseline, CssVarsProvider, Theme } from "@mui/joy";
import { AppProps } from "next/app";
import config from "../../configuration";
import { useEffect, useState } from "react";
import purpleMix from "@/themes/purpleMix";
import sky from "@/themes/sky";
import zinc from "@/themes/zinc";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

export interface ThemesInterface {
  [theme: string]: Theme
}

const themes: ThemesInterface = {
  "Material Extended": materialExtended,
  "Purple Mix": purpleMix,
  "Sky": sky,
  "Zinc": zinc
}

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<keyof ThemesInterface>(config.userConfiguration.defaultColorMode || Object.keys(themes)[0]);

  useEffect(() => {
    const themeName = localStorage.getItem('themeName');
    if (themeName) {
      setTheme(themeName)
    }
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange theme={themes[theme]} defaultMode={config.userConfiguration.defaultColorMode || 'light'}>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} setTheme={(theme: keyof ThemesInterface) => { localStorage.setItem('themeName', theme as string); setTheme(theme) }} theme={theme} themes={themes} />
      </DndProvider>
      <CssBaseline />
    </CssVarsProvider>
  );
}
