import AreaChartWrapper from "@/components/charts/AreaChart";
import PieChartWrapper from "@/components/charts/PieChart";
import { Configuration } from "@/types/Configuration";
import { BarChartSharp, HexagonRounded } from "@mui/icons-material";

let config: Configuration = {
  title: 'REWE COST OPTIMIZATION',
  sidebarTitle: 'REWE CO',
  logo: <HexagonRounded />,
  userConfiguration: {
    defaultColorMode: 'dark',
    defaultColorScheme: 'Material Extended',
    defaultLayoutWidth: 75,
    homepageLink: "https://rewe-group.at/de"
  },
}

export default config
