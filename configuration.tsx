import AreaChartWrapper from "@/components/charts/AreaChart";
import PieChartWrapper from "@/components/charts/PieChart";
import BarChartWrapper from "@/components/charts/BarChart";
import LineChartWrapper from "@/components/charts/LineChart";
import RadarChartWrapper from "@/components/charts/RadarChart";
import RadialChartWrapper from "@/components/charts/RadialChart";
import ScatterChartWrapper from "@/components/charts/ScatterChart";
import StackedAreaChartWrapper from "@/components/charts/StackedAreaChart";
import StackedBarChartWrapper from "@/components/charts/StackedBarChart";
import TreeChartWrapper from "@/components/charts/Treemap";
import BubbleChartWrapper from "@/components/charts/BubbleChart"


import { Configuration } from "@/types/Configuration";
import { BarChartSharp, HexagonRounded } from "@mui/icons-material";

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
const dataScatter = [
  { xA: 100, y: 200},
  { x: 120, y: 100},
  { x: 170, y: 300},
  { x: 140, y: 250},
  { x: 150, y: 400},
  { x: 110, y: 280},
];
const dataRadar = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];
const dataTree = [
  {
    name: 'axis',
    children: [
      { name: 'Axes', size: 1302 },
      { name: 'Axis', size: 24593 },
      { name: 'AxisGridLine', size: 652 },
      { name: 'AxisLabel', size: 636 },
      { name: 'CartesianAxes', size: 6703 },
    ],
  },
  {
    name: 'controls',
    children: [
      { name: 'AnchorControl', size: 2138 },
      { name: 'ClickControl', size: 3824 },
      { name: 'Control', size: 1353 },
      { name: 'ControlList', size: 4665 },
      { name: 'DragControl', size: 2649 },
      { name: 'ExpandControl', size: 2832 },
      { name: 'HoverControl', size: 4896 },
      { name: 'IControl', size: 763 },
      { name: 'PanZoomControl', size: 5222 },
      { name: 'SelectionControl', size: 7862 },
      { name: 'TooltipControl', size: 8435 },
    ],
  },
  {
    name: 'data',
    children: [
      { name: 'Data', size: 20544 },
      { name: 'DataList', size: 19788 },
      { name: 'DataSprite', size: 10349 },
      { name: 'EdgeSprite', size: 3301 },
      { name: 'NodeSprite', size: 19382 },
      {
        name: 'render',
        children: [
          { name: 'ArrowType', size: 698 },
          { name: 'EdgeRenderer', size: 5569 },
          { name: 'IRenderer', size: 353 },
          { name: 'ShapeRenderer', size: 2247 },
        ],
      },
      { name: 'ScaleBinding', size: 11275 },
      { name: 'Tree', size: 7147 },
      { name: 'TreeBuilder', size: 9930 },
    ],
  },
  {
    name: 'events',
    children: [
      { name: 'DataEvent', size: 7313 },
      { name: 'SelectionEvent', size: 6880 },
      { name: 'TooltipEvent', size: 3701 },
      { name: 'VisualizationEvent', size: 2117 },
    ],
  },
  {
    name: 'legend',
    children: [
      { name: 'Legend', size: 20859 },
      { name: 'LegendItem', size: 4614 },
      { name: 'LegendRange', size: 10530 },
    ],
  },
  {
    name: 'operator',
    children: [
      {
        name: 'distortion',
        children: [
          { name: 'BifocalDistortion', size: 4461 },
          { name: 'Distortion', size: 6314 },
          { name: 'FisheyeDistortion', size: 3444 },
        ],
      },
      {
        name: 'encoder',
        children: [
          { name: 'ColorEncoder', size: 3179 },
          { name: 'Encoder', size: 4060 },
          { name: 'PropertyEncoder', size: 4138 },
          { name: 'ShapeEncoder', size: 1690 },
          { name: 'SizeEncoder', size: 1830 },
        ],
      },
      {
        name: 'filter',
        children: [
          { name: 'FisheyeTreeFilter', size: 5219 },
          { name: 'GraphDistanceFilter', size: 3165 },
          { name: 'VisibilityFilter', size: 3509 },
        ],
      },
      { name: 'IOperator', size: 1286 },
      {
        name: 'label',
        children: [
          { name: 'Labeler', size: 9956 },
          { name: 'RadialLabeler', size: 3899 },
          { name: 'StackedAreaLabeler', size: 3202 },
        ],
      },
      {
        name: 'layout',
        children: [
          { name: 'AxisLayout', size: 6725 },
          { name: 'BundledEdgeRouter', size: 3727 },
          { name: 'CircleLayout', size: 9317 },
          { name: 'CirclePackingLayout', size: 12003 },
          { name: 'DendrogramLayout', size: 4853 },
          { name: 'ForceDirectedLayout', size: 8411 },
          { name: 'IcicleTreeLayout', size: 4864 },
          { name: 'IndentedTreeLayout', size: 3174 },
          { name: 'Layout', size: 7881 },
          { name: 'NodeLinkTreeLayout', size: 12870 },
          { name: 'PieLayout', size: 2728 },
          { name: 'RadialTreeLayout', size: 12348 },
          { name: 'RandomLayout', size: 870 },
          { name: 'StackedAreaLayout', size: 9121 },
          { name: 'TreeMapLayout', size: 9191 },
        ],
      },
      { name: 'Operator', size: 2490 },
      { name: 'OperatorList', size: 5248 },
      { name: 'OperatorSequence', size: 4190 },
      { name: 'OperatorSwitch', size: 2581 },
      { name: 'SortOperator', size: 2023 },
    ],
  },
];
const data01 = [
  { hour: '12a', index: 1, value: 170 },
  { hour: '1a', index: 1, value: 180 },
  { hour: '2a', index: 1, value: 150 },
  { hour: '3a', index: 1, value: 120 },
  { hour: '4a', index: 1, value: 200 },
  { hour: '5a', index: 1, value: 300 },
  { hour: '6a', index: 1, value: 400 },
  { hour: '7a', index: 1, value: 200 },
  { hour: '8a', index: 1, value: 100 },
  { hour: '9a', index: 1, value: 150 },
  { hour: '10a', index: 1, value: 160 },
  { hour: '11a', index: 1, value: 170 },
  { hour: '12a', index: 1, value: 180 },
  { hour: '1p', index: 1, value: 144 },
  { hour: '2p', index: 1, value: 166 },
  { hour: '3p', index: 1, value: 145 },
  { hour: '4p', index: 1, value: 150 },
  { hour: '5p', index: 1, value: 170 },
  { hour: '6p', index: 1, value: 180 },
  { hour: '7p', index: 1, value: 165 },
  { hour: '8p', index: 1, value: 130 },
  { hour: '9p', index: 1, value: 140 },
  { hour: '10p', index: 1, value: 170 },
  { hour: '11p', index: 1, value: 180 },
];

const data02 = [
  { hour: '12a', index: 1, value: 160 },
  { hour: '1a', index: 1, value: 180 },
  { hour: '2a', index: 1, value: 150 },
  { hour: '3a', index: 1, value: 120 },
  { hour: '4a', index: 1, value: 200 },
  { hour: '5a', index: 1, value: 300 },
  { hour: '6a', index: 1, value: 100 },
  { hour: '7a', index: 1, value: 200 },
  { hour: '8a', index: 1, value: 100 },
  { hour: '9a', index: 1, value: 150 },
  { hour: '10a', index: 1, value: 160 },
  { hour: '11a', index: 1, value: 160 },
  { hour: '12a', index: 1, value: 180 },
  { hour: '1p', index: 1, value: 144 },
  { hour: '2p', index: 1, value: 166 },
  { hour: '3p', index: 1, value: 145 },
  { hour: '4p', index: 1, value: 150 },
  { hour: '5p', index: 1, value: 160 },
  { hour: '6p', index: 1, value: 180 },
  { hour: '7p', index: 1, value: 165 },
  { hour: '8p', index: 1, value: 130 },
  { hour: '9p', index: 1, value: 140 },
  { hour: '10p', index: 1, value: 160 },
  { hour: '11p', index: 1, value: 180 },
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
        {
          title: 'Line Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <LineChartWrapper data={data} xAxis="name" yAxies="uv" />
            ]
          }
        },
        {
          title: 'Radar Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <RadarChartWrapper data={dataRadar} xAxis="name" yAxis="uv" />
            ]
          }
        },
        {
          title: 'Radial Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <RadialChartWrapper data={data} xAxis="name" yAxis="uv" />
            ]
          }
        },
        {
          title: 'Scatter Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <ScatterChartWrapper data={dataScatter} xAxis="x" yAxis="y" />
            ]
          }
        },
        {
          title: 'Stacked Area Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <StackedAreaChartWrapper data={data} xAxis="name" yAxis="uv" />
            ]
          }
        },
        {
          title: 'Stacked Bar Chart',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <StackedBarChartWrapper data={data} xAxis="name" yAxies="uv" />
            ]
          }
        },
        {
          title: 'Tree Map',
          description: '',
          icon: <BarChartSharp />,
          subpages: [],
          content: {
            layout: 'row',
            contents: [
              <TreeChartWrapper data={dataTree} />
            ]
          }
        },
      ],
    }
  ]
}

export default config
