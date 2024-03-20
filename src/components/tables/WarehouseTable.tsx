import { ElecricityEmissionRate, Warehouse } from "@/types/InputTypes";
import { Opacity } from "@mui/icons-material";
import { Box, Button, Checkbox, Input, Option, Select, Table } from "@mui/joy";

export default function WarehouseTable({ warehouseData,setWarehouseData, setWarehouseRowData }: { warehouseData: Warehouse[], setWarehouseData: Function, setWarehouseRowData: Function }) {
    return (<>
        <Table
            borderAxis="bothBetween"
            hoverRow
        >
            <thead>
                <tr>
                    <th style={{ width: "var(--Table-firstColumnWidth)" }}>
                        Warehouse
                    </th>
                    <th style={{}}>ElectricityEmissionRate</th>
                    <th style={{}}>Area&nbsp;(m2)</th>
                    <th style={{}}>Cooled Area&nbsp;(m2)</th>
                    <th style={{}}>Items Delivered &nbsp;(per year)</th>
                    <th style={{
                        width: "50"
                    }}>Solar</th>
                    <th
                        aria-label="last"
                        style={{ width: "100" }}
                    />
                </tr>
            </thead>
            <tbody>
                {warehouseData.map((row, index) => (
                    <tr>
                        <td>
                            <Input
                                value={row.name}
                                onChange={(event) => {
                                    setWarehouseRowData(index, "name", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Select onChange={(event, newvalue) => setWarehouseRowData(index, "electricityEmissionRate", newvalue)}>
                                <Option value={ElecricityEmissionRate.GAS}>Gas</Option>
                                <Option value={ElecricityEmissionRate.OEL}>Oel</Option>
                                <Option value={ElecricityEmissionRate.ELECTRIC}>Electric</Option>
                            </Select>
                        </td>
                        <td>
                            <Input
                                type="number"
                                value={row.area_m2}
                                onChange={(event) => {
                                    setWarehouseRowData(index, "area_m2", parseInt(event.target.value));
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                type="number"
                                value={row.area_cooled_m2}
                                onChange={(event) => {
                                    setWarehouseRowData(index, "area_cooled_m2", parseInt(event.target.value));
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                type="number"
                                value={row.itemsdelivered_year} onChange={(event) => {
                                    setWarehouseRowData(index, "itemsdelivered_year", parseInt(event.target.value));
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Checkbox checked={row.solarPanels} onChange={(event) => {
                                setWarehouseRowData(index, "cooled", event.target.checked)
                            }}/>
                        </td>
                        <td>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                    size="sm"
                                    variant="soft"
                                    color="danger"
                                    onClick={() => {
                                        setWarehouseData((prevData: Warehouse[]) =>
                                            prevData.filter((_, i) => i !== index)
                                        );
                                    }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Button
            onClick={() => {
                // Add a new truck to the list
                setWarehouseData((prevData: Warehouse[]) => [
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
