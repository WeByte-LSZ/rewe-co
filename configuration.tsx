import AreaChartWrapper from "@/components/charts/AreaChart";
import { Configuration } from "@/types/Configuration";
import { BarChartSharp, HexagonRounded, PieChartSharp } from "@mui/icons-material";
import { AspectRatio, Box, Typography } from "@mui/joy";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
          title: 'Austria',
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
                  content: {
                    layout: 'column',
                    contents: [
                      {
                        layout: 'column',
                        contents: [
                          {
                            layout: 'row',
                            contents: [
                              <AreaChartWrapper data={data} xAxis="name" yAxies="uv" />,
                            ]
                          },
                          {
                            layout: 'row',
                            contents: [
                              <AreaChartWrapper data={data} xAxis="name" yAxies="uv" />, ,
                              <Typography>
                                r32r
                              </Typography>
                            ]
                          },
                        ]
                      }
                    ]
                  }
                },
                {
                  title: '10. District',
                  description: '',
                  icon: <BarChartSharp />,
                  subpages: [],
                  content: {
                    layout: 'row',
                    contents: []
                  }
                },
              ],
              content: {
                layout: 'row',
                contents: []
              }

            },
          ],
          content: {
            layout: 'row',
            contents: []
          }
        },
        {
          title: 'Lower Austria',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: []
          }
        },
        {
          title: 'Upper Austria',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: []
          }
        },
      ],
    }
  ]
}

export default config
