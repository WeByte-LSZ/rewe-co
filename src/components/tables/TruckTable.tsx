import { CO2EmissionsFactor, ElecricityEmissionRate, Truck } from "@/types/InputTypes";
import { Box, Button, Checkbox, Input, Option, Select, Table } from "@mui/joy";
import { useEffect } from "react";

export default function TruckTable({ truckData, setTruckData, setTruckRowData }: { truckData: Truck[], setTruckData: Function, setTruckRowData: Function }) {
    return (<>
        <Table
            borderAxis="bothBetween"
            hoverRow
        >
            <thead>
                <tr>
                    <th style={{ width: "var(--Table-firstColumnWidth)" }}>
                        Truck Type
                    </th>
                    <th style={{ width: 170 }}>CO2 Emission Factor</th>
                    <th style={{ width: 170 }}>Distance&nbsp;(km)</th>
                    <th style={{ width: 170 }}>Additional Weight&nbsp;(kg)</th>
                    <th style={{ width: 250 }}>Fuel Consumption&nbsp;(l/100km)</th>
                    <th style={{ width: 100 }}>Cooling</th>
                    <th style={{ width: 100 }}>Solar</th>
                    <th style={{ width: 100 }}>Max Weight</th>
                    <th style={{ width: 100 }}>Max Volume</th>
                    <th style={{ width: 160 }}>Number of Trucks</th>
                    <th
                        aria-label="last"
                        style={{ width: "100" }}
                    />
                </tr>
            </thead>
            <tbody>
                {truckData.map((row, index) => (
                    <tr>
                        <td>
                            <Input
                                value={row.type}
                                onChange={(event) => {
                                    setTruckRowData(index, "type", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Select onChange={(e, newvalue) => setTruckRowData(index, "co2EmissionFactor", newvalue)}>
                                <Option value={CO2EmissionsFactor.DIESEL}>Diesel</Option>
                                <Option value={CO2EmissionsFactor.ULSD}>ULSD</Option>
                                <Option value={CO2EmissionsFactor.BIO}>Bio</Option>
                            </Select>
                        </td>
                        <td>
                            <Input
                                value={row.distanceDriven}
                                onChange={(event) => {
                                    setTruckRowData(index, "distanceDriven", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.additionalWeight}
                                onChange={(event) => {
                                    setTruckRowData(index, "additionalWeight", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.fuelConsumptionRate}
                                onChange={(event) => {
                                    setTruckRowData(index, "fuelConsumptionRate", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Checkbox checked={row.cooled} onChange={(event) => {
                                setTruckRowData(index, "cooled", event.target.checked)
                            }}/>
                        </td>
                        <td>
                            <Checkbox checked={row.solarPanels} onChange={(event) => {
                                setTruckRowData(index, "solarPanels", event.target.checked)
                            }}/>
                        </td>
                        <td>
                            <Input
                                value={row.maxWeight}
                                onChange={(event) => {
                                    setTruckRowData(index, "maxWeight", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.maxVolume}
                                onChange={(event) => {
                                    setTruckRowData(index, "maxVolume", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.numtrucks}
                                onChange={(event) => {
                                    setTruckRowData(index, "numtrucks", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            {!row.isDefault ? <Box sx={{ display: "flex", gap: 1 }}>
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
                            </Box>: " "}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Button
            onClick={() => {
                // Add a new truck to the list
                setTruckData((prevData: Truck[]) => [
                    ...prevData,
                    {
                    },
                ]);
            }}
        >
            Add
        </Button>

    </>)
}
