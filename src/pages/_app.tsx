import "@/style/globals.css"
import theme from "@/themes/materialExtended";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { AppProps } from "next/app";
import config from "../../configuration";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider disableTransitionOnChange theme={theme} defaultMode={config.userConfiguration.defaultColorMode || 'light'}>
      <Component {...pageProps} />
      <CssBaseline />
    </CssVarsProvider>
  );
}
