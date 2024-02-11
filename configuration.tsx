import { Configuration } from "@/types/Configuration";
import { BarChartSharp, HexagonRounded, PieChartSharp } from "@mui/icons-material";

let config: Configuration = {
  title: 'DataVis E-Waste',
  sidebarTitle: 'DataVis E-Waste',
  logo: <HexagonRounded />,
  userConfiguration: {
    defaultColorMode: 'dark',
    defaultColorScheme: 'yapperino',
    defaultLayoutWidth: 75,
    homepageLink: "https://datavis-teal.vercel.app/home"
  },
  categories: [
    {
      title: 'General',
      pages: [
        {
          title: 'Germany',
          description: '',
          icon: <BarChartSharp />,
          subpages: [
            {
              title: 'Vienna',
              description: '',
              icon: <BarChartSharp />,
              subpages: [
                {
                  title: '20. District',
                  description: '',
                  icon: <BarChartSharp />,
                  subpages: [],
                  contents: []
                },
                {
                  title: '10. District',
                  description: '',
                  icon: <BarChartSharp />,
                  subpages: [],
                  contents: []
                },
              ],
              contents: []
            },
          ],
          contents: []
        },
        {
          title: 'Lower Austria',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          contents: []
        },
        {
          title: 'Upper Austria',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          contents: []
        },
      ],
    }
  ]
}

export default config
