import { Report } from "@/types/Report";
import { CloseSharp } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Sheet, Tab, TabList, TabPanel, Table, Tabs, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import StyledGrid from "../styledComponents/StyledGrid";
import ReactECharts from 'echarts-for-react';


const defaultStore: Report = {
  "title": "Test",
  "description": "Test",
  "maximum": -9999,
  "co2_total": -9999,
  "eur_total": -9999,
  "truck_types": {
    "fuel_co2": -9999,
    "fuel_eur": -9999,
    "solar_co2": -9999,
    "solar_eur": -9999,
    "truck_types_data": []
  },
  "warehouses": {
    "total_co2": -9999,
    "total_eur": -9999,
    "solar_co2": -9999,
    "solar_eur": -9999,
    "heating_co2": -9999,
    "heating_eur": -9999,
    "cooling_co2": -9999,
    "cooling_eur": -9999,
    "air_conditioning_co2": -9999,
    "air_conditioning_eur": -9999,
    "warehouses_data": []
  },
  "product_types": {
    "total_co2": -9999,
    "total_eur": -9999,
    "product_types_data": []
  }
};

const units = {
  "EUR": "eur",
  "CO2 in KG": "co2"
}

const reverseUnit = {
  "eur": "EUR",
  "co2": "CO2 in KG"
}

function GraphView({ data, unit }: { data: Report, unit: string }) {
  const [highestEmissionsTruck, setHighestEmissionsTruck] = useState(0);
  const [highestOptimizationTruck, setHighestOptimizationTruck] = useState(0);
  const [highestSolarTruck, setHighestSolarTruck] = useState(0);
  const [highestEmissionsWarehouse, setHighestEmissionsWarehouse] = useState(0);
  const [highestSolarWarehouse, setHighestSolarWarehouse] = useState(0);

  useEffect(() => {
    let het = 0;
    let hot = 0;
    let hst = 0;
    data.truck_types.truck_types_data.forEach((e, i) => {
      if (data.truck_types.truck_types_data[het]?.fuel_co2 < e.fuel_co2) {
        het = i;
      }
      if (data.truck_types.truck_types_data[hot]?.fuel_co2 - data.truck_types.truck_types_data[hot].optimized_fuel_co2 < e.fuel_co2 - e.optimized_fuel_co2) {
        hot = i;
      }
      if (data.truck_types.truck_types_data[hst]?.solar_co2 < e.solar_co2) {
        hst = i;
      }
    })

    let hew = 0;
    let hsw = 0;
    data.warehouses.warehouses_data.forEach((e, i) => {
      if (data.warehouses.warehouses_data[het]?.total_co2 < e.total_co2) {
        hew = i;
      }
      if (data.warehouses.warehouses_data[hst]?.solar_co2 < e.solar_co2) {
        hsw = i;
      }
    })

    setHighestEmissionsTruck(het);
    setHighestOptimizationTruck(hot);
    setHighestSolarTruck(hst);
    setHighestEmissionsTruck(hew)
    setHighestSolarWarehouse(hsw)

  }, [data])

  return (
    <Grid container rowGap={0.5} sx={{
      flexGrow: 1,
      overflowY: 'auto'
    }}>
      <StyledGrid xs={12}>
        <Sheet sx={{ padding: 4 }}>
          <Typography level="h2">
            Estimated Pollution: {data.truck_types.fuel_co2 + data.warehouses.total_co2} KG CO2
          </Typography>
          <Typography level="h2">
            Estimated Cost: {data.truck_types.fuel_eur + data.warehouses.total_eur} EURO
          </Typography>
        </Sheet>
      </StyledGrid>

      <StyledGrid xs={4}>
        <ReactECharts
          option={{
            title: {
              text: `Pollution by trucks: ${data.truck_types[`fuel_${unit}`]} ${reverseUnit[unit]}`,
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              bottom: '0',
              left: 'center'
            },
            series: [
              {
                name: `Unit: ${reverseUnit[unit]}`,
                type: 'pie',
                radius: ['60%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                  borderRadius: 0,
                  borderColor: '#fff',
                  borderWidth: 1
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'normal'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [...data.truck_types.truck_types_data.map((e) => { return { name: e.name, value: e[`fuel_${unit}`] } }), { name: 'Saved through solar', value: data.truck_types[`solar_${unit}`] }]
              }
            ]
          }}
          notMerge={true}
          lazyUpdate={true}
        />
      </StyledGrid>

      <StyledGrid xs={4}>
        <ReactECharts
          option={{
            title: {
              text: `Pollution by warehouses : ${data.warehouses[`total_${unit}`]} ${reverseUnit[unit]}`,
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              bottom: '0',
              left: 'center'
            },
            series: [
              {
                name: `Unit: ${reverseUnit[unit]}`,
                type: 'pie',
                radius: ['60%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                  borderRadius: 0,
                  borderColor: '#fff',
                  borderWidth: 1
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'normal'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [...data.warehouses.warehouses_data.map((e) => { return { name: e.name, value: e[`total_${unit}`] } }), { name: 'Saved through solar', value: data.warehouses[`solar_${unit}`] }]
              }
            ]
          }}
          notMerge={true}
          lazyUpdate={true}
        />
      </StyledGrid>

      <StyledGrid xs={4}>
        <ReactECharts
          option={{
            title: {
              text: `Pollution in total`
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              bottom: '0',
              left: 'center'
            },
            series: [
              {
                name: `Unit: ${reverseUnit[unit]}`,
                type: 'pie',
                radius: ['60%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                  borderRadius: 0,
                  borderColor: '#fff',
                  borderWidth: 1
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'normal'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [{ name: "Pollution by trucks", value: data.truck_types[`fuel_${unit}`] }, { name: 'Pollution by warehouses', value: data.warehouses[`total_${unit}`] }, { name: "Saved through solar", value: data.truck_types[`solar_${unit}`] + data.warehouses[`solar_${unit}`] }]
              }
            ]
          }}
          notMerge={true}
          lazyUpdate={true}
        />
      </StyledGrid>

      <StyledGrid xs={8}>
        <ReactECharts option={{
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true
              }
            }
          },
          legend: {
            bottom: '0',
            left: 'center'
          },
          toolbox: {
            show: false,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: data.truck_types.truck_types_data.map((e) => e.name)
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: `Pollution in ${reverseUnit[unit]}`,
            }
          ],
          series: [
            {
              name: 'CO2 Pollution without optimization',
              type: 'bar',
              data: data.truck_types.truck_types_data.map((e) => e[`fuel_${unit}`])
            },
            {
              name: 'CO2 Pollution without solar',
              type: 'bar',
              data: data.truck_types.truck_types_data.map((e) => e[`solar_${unit}`] + e[`fuel_${unit}`])
            },
            {
              name: 'CO2 Pollution with optimization',
              type: 'bar',
              data: data.truck_types.truck_types_data.map((e) => e[`optimized_fuel_${unit}`])
            },
          ]
        }}
        />
      </StyledGrid>

      <StyledGrid xs={4}>
        <Box sx={{ padding: 1 }}>
          <Typography level="h3">
            Optimization results
          </Typography>
          <Divider />
          <Typography level="h4">
            Highest emissions: {data.truck_types.truck_types_data[highestEmissionsTruck]?.name || 'Undefined'}
          </Typography>
          <Typography level="body-lg">
            Without optimization: {data.truck_types.truck_types_data[highestEmissionsTruck]?.fuel_co2 || -999} KG
          </Typography>
          <Typography level="body-lg">
            With optimization: {data.truck_types.truck_types_data[highestEmissionsTruck]?.optimized_fuel_co2 || -999} KG
          </Typography>

          <Typography level="h4">
            Highest optimization benefit: {data.truck_types.truck_types_data[highestOptimizationTruck]?.name || 'Undefined'}
          </Typography>
          <Typography level="body-lg">
            Without optimization: {data.truck_types.truck_types_data[highestOptimizationTruck]?.fuel_co2 || -999} KG
          </Typography>
          <Typography level="body-lg">
            With optimization: {data.truck_types.truck_types_data[highestOptimizationTruck]?.optimized_fuel_co2 || -999} KG
          </Typography>

          <Typography level="h4">
            Highest solar benefit: {data.truck_types.truck_types_data[highestSolarTruck]?.name || 'Undefined'}
          </Typography>
          <Typography level="body-lg">
            Without solar: {data.truck_types.truck_types_data[highestSolarTruck]?.fuel_co2 + data.truck_types.truck_types_data[highestSolarTruck]?.solar_co2 || -999} KG
          </Typography>
          <Typography level="body-lg">
            With solar: {data.truck_types.truck_types_data[highestSolarTruck]?.fuel_co2 || -999} KG
          </Typography>
        </Box>
      </StyledGrid>

      <StyledGrid xs={4}>
        <Box sx={{ padding: 1 }}>
          <Typography level="h3">
            Optimization results
          </Typography>
          <Divider />
          <Typography level="h4">
            Highest emissions: {data.warehouses.warehouses_data[highestEmissionsWarehouse]?.name || 'Undefined'}
          </Typography>
          <Typography level="body-lg">
            Total emissions: {data.warehouses.warehouses_data[highestEmissionsWarehouse]?.total_co2 || -999} KG
          </Typography>
          <Typography level="body-lg">
            Solar benefit: {data.warehouses.warehouses_data[highestEmissionsWarehouse]?.solar_co2 || -999} KG
          </Typography>

          <Typography level="h4">
            Highest solar benefit: {data.warehouses.warehouses_data[highestSolarWarehouse]?.name || 'Undefined'}
          </Typography>
          <Typography level="body-lg">
            Without solar: {data.warehouses.warehouses_data[highestSolarWarehouse]?.total_co2 + data.warehouses.warehouses_data[highestSolarWarehouse]?.solar_co2 || -999} KG
          </Typography>
          <Typography level="body-lg">
            With solar: {data.warehouses.warehouses_data[highestSolarWarehouse]?.total_co2 || -999} KG
          </Typography>
        </Box>
      </StyledGrid>
      <StyledGrid xs={8}>
        <ReactECharts option={{
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true
              }
            }
          },
          legend: {
            bottom: '0',
            left: 'center'
          },
          toolbox: {
            show: false,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: data.warehouses.warehouses_data.map((e) => e.name)
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: `Pollution in ${reverseUnit[unit]}`,
            }
          ],
          series: [
            {
              name: 'CO2 Pollution with solar',
              type: 'bar',
              data: data.warehouses.warehouses_data.map((e) => e[`total_${unit}`])
            },
            {
              name: 'CO2 Pollution without solar',
              type: 'bar',
              data: data.warehouses.warehouses_data.map((e) => e[`solar_${unit}`] + e[`total_${unit}`])
            }
          ]
        }}
        />
      </StyledGrid>

      <StyledGrid>
        <Table borderAxis="both">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Name</th>
              <th>Cooling</th>
              <th>Optimized CO2 in KG</th>
              <th>Optimized CO2 in €</th>
            </tr>
          </thead>
          <tbody>
            {data.product_types.product_types_data.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.cooling ? 'YES' : 'NO'}</td>
                <td>{row.optimized_co2} KG</td>
                <td>{row.optimized_eur} €</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Totals</th>
              <td>/</td>
              <td>{data.product_types.total_co2} KG</td>
              <td>{data.product_types.total_eur} €</td>
            </tr>
          </tfoot>
        </Table>
      </StyledGrid>

    </Grid >
  )
}

export default function ReportProvider({ timestamp, setContent, index }: { timestamp: string, setContent: Function, index: number }) {

  const [data, setData] = useState(defaultStore);
  const [unit, setUnit] = useState('eur');

  useEffect(() => {
    fetch(`/api/getDataPoint?timestamp=${timestamp}`).then((e) => e.json()).then((e: { data: Report }) => {
      setData(e.data || defaultStore)
    })
  }, [timestamp])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography level="body-sm">Report from {timestamp}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
          <Typography level="h1">{data.title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
            <IconButton onClick={() => {
              setContent((old: JSX.Element[]) => {
                if (old.length == 1) return old;
                let firstPart = (index > 0) ? old.slice(0, index - 1) : []
                return ([
                  ...firstPart,
                  ...old.slice(index + 1)
                ])
              })
            }} sx={{ display: 'flex', alignItems: 'center' }}>
              <CloseSharp />
            </IconButton>
          </Box>
        </Box>
        <Typography level="body-md">{data.description}</Typography>


        <Tabs
          aria-label="Outlined tabs"
          onChange={(event, value) => { console.log(value); setUnit(units[Object.keys(units)[value as number]]) }}
        >
          <TabList variant="outlined" disableUnderline>
            {
              Object.keys(units).map((e, i) => (
                <Tab
                  key={`unit-switch-${i}`}
                  variant={unit === units[Object.keys[i]] ? 'soft' : 'plain'}
                  color={unit === units[Object.keys[i]] ? 'success' : 'neutral'}
                >
                  {e}
                </Tab>
              ))
            }
          </TabList>
        </Tabs>

        <GraphView data={data} unit={unit} />
      </Box>
    </Box >
  )
}
