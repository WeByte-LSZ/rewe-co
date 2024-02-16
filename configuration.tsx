import { Configuration } from "@/types/Configuration";
import { BarChartSharp, HexagonRounded, PieChartSharp } from "@mui/icons-material";
import { Typography } from "@mui/joy";

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
                      <Typography>
                        Felix Dahmen 4DHIT
                      </Typography>,
                      {
                        layout: 'column',
                        contents: [
                          {
                            layout: 'row',
                            contents: [
                              <Typography>
                                r32r
                              </Typography>,
                              <Typography>
                                r32r
                              </Typography>
                            ]
                          },
                          {
                            layout: 'row',
                            contents: [
                              <Typography>
                                r32r
                              </Typography>,
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
