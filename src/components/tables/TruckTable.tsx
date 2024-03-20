import {
  CO2EmissionsFactor,
  ElecricityEmissionRate,
  Truck,
} from "@/types/InputTypes";
import { Box, Button, Checkbox, Input, Option, Select, Table } from "@mui/joy";
import { useEffect } from "react";

export default function TruckTable({
  truckData,
  setTruckData,
  setTruckRowData,
}: {
  truckData: Truck[];
  setTruckData: Function;
  setTruckRowData: Function;
}) {
  return (
    <>
      <Table borderAxis="bothBetween" hoverRow>
        <thead>
          <tr>
            <th style={{ width: "15%" }}>Fahrzeug Typ</th>
            <th style={{ width: "11%" }}>CO2 Emissions Faktor</th>
            <th style={{ width: "9%" }}>Strecke&nbsp;(km)</th>
            <th style={{ width: "11%" }}>Additional Weight&nbsp;(kg)</th>
            <th style={{ width: "14%" }}>Treibstoffverbrauch&nbsp;(l/100km)</th>
            <th style={{}}>Kühlung</th>
            <th style={{}}>Solar</th>
            <th style={{}}>Max. Gewicht</th>
            <th style={{}}>Max. Volumen</th>
            <th style={{}}>Anzahl</th>
            <th aria-label="last" style={{ width: "100" }} />
          </tr>
        </thead>
        <tbody>
          {truckData.map((row, index) => (
            <tr>
              <td>
                <Input
                  value={row.type}
                  onChange={(event) =>
                    setTruckRowData(index, "type", event.target.value)
                  }
                ></Input>
              </td>
              <td>
                <Select
                  onChange={(e, newvalue) =>
                    setTruckRowData(index, "co2EmissionFactor", newvalue)
                  }
                >
                  <Option value={CO2EmissionsFactor.DIESEL}>Diesel</Option>
                  <Option value={CO2EmissionsFactor.ULSD}>ULSD</Option>
                  <Option value={CO2EmissionsFactor.BIO}>Bio</Option>
                </Select>
              </td>
              <td>
                <Input
                  type="number"
                  value={row.distanceDriven}
                  onChange={(event) =>
                    setTruckRowData(index, "distanceDriven", parseInt(event.target.value))
                  }
                ></Input>
              </td>
              <td>
                <Input
                  type="number"
                  value={row.additionalWeight}
                  onChange={(event) =>
                    setTruckRowData(
                      index,
                      "additionalWeight",
                      parseInt(event.target.value)
                    )
                  }
                ></Input>
              </td>
              <td>
                <Input
                  type="number"
                  value={row.fuelConsumptionRate}
                  onChange={(event) =>
                    setTruckRowData(
                      index,
                      "fuelConsumptionRate",
                      parseInt(event.target.value)
                    )
                  }
                ></Input>
              </td>
              <td>
                <Checkbox
                  checked={row.cooled}
                  onChange={(event) => setTruckRowData(index, "cooled", event.target.checked)}
                />
              </td>
              <td>
                <Checkbox
                  checked={row.solarPanels}
                  onChange={(event) => setTruckRowData(index, "solarPanels", event.target.checked)}
                />
              </td>
              <td>
                <Input
                  type="number"
                  value={row.maxWeight}
                  onChange={(event) => setTruckRowData(index, "maxWeight", parseInt(event.target.value))}
                ></Input>
              </td>
              <td>
                <Input
                  type="number"
                  value={row.maxVolume}
                  onChange={(event) => setTruckRowData(index, "maxVolume", parseInt(event.target.value))}
                ></Input>
              </td>
              <td>
                <Input
                  type="number"
                  value={row.numtrucks}
                  onChange={(event) => setTruckRowData(index, "numtrucks", parseInt(event.target.value))}
                ></Input>
              </td>
              <td>
                {!row.isDefault ? (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="sm"
                      variant="soft"
                      color="danger"
                      onClick={() => {
                        setTruckData((prevData: Truck[]) =>
                          prevData.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                ) : (
                  " "
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        onClick={() => {
          // Add a new truck to the list
          setTruckData((prevData: Truck[]) => [...prevData, {}]);
        }}
      >
        Add
      </Button>
    </>
  );
}
