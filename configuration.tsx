import { Configuration } from "@/types/Configuration";
import { HexagonRounded } from "@mui/icons-material";

let config: Configuration = {
  title: 'REWE COST OPTIMIZATION',
  sidebarTitle: 'REWE CO',
  logo: <HexagonRounded />,
  userConfiguration: {
    defaultColorMode: 'dark',
    defaultColorScheme: 'Material Extended',
    defaultLayoutWidth: 90,
    homepageLink: "https://rewe-group.at/de"
  },
}

export default config
