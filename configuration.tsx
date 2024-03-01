import AreaChartWrapper from "@/components/charts/AreaChart";
import PieChartWrapper from "@/components/charts/PieChart";
import BarChartWrapper from "@/components/charts/BarChart";
import { Configuration } from "@/types/Configuration";
import { BarChartSharp, HexagonRounded, PieChartSharp } from "@mui/icons-material";

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

const data2 = [
  {
    name: 'Page A',
    value: 4000,
  },
  {
    name: 'Page B',
    value: 3000,
  },
  {
    name: 'Page C',
    value: 2000,
  },
  {
    name: 'Page D',
    value: 2780,
  },
  {
    name: 'Page E',
    value: 1890,
  },
  {
    name: 'Page F',
    value: 2390,
  },
  {
    name: 'Page G',
    value: 3490,
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
      title: 'Charts',
      pages: [
        {
          title: 'Area Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <AreaChartWrapper data={data} xAxis="name" yAxies="uv" />
            ]
          }
        },
        {
          title: 'Bar Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <BarChartWrapper data={data} xAxis="name" yAxies="uv" />
            ]
          }
        },
        {
          title: 'Pie Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <PieChartWrapper data={data2} />
            ]
          }
        },
      ],
    }
  ]
}

export default config
