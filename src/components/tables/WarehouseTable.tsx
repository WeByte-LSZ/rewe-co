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
                    <th style={{ width: 100 }}>ElectricityEmissionRate</th>
                    <th style={{ width: 170 }}>Area&nbsp;(m2)</th>
                    <th style={{ width: 170 }}>Cooled Area&nbsp;(m2)</th>
                    <th style={{ width: 170 }}>Items Delivered &nbsp;(per year)</th>
                    <th style={{ width: 100 }}>Solar</th>
                    <th
                        aria-label="last"
                        style={{ width: "var(--Table-lastColumnWidth)" }}
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
                            <Select onChange={(event) => {
                                if(event == null) return;
                                const target = event.target as HTMLSelectElement;
                                setWarehouseRowData(index, "electricityEmissionRate", target.value);
                            }}>
                                <Option value={ElecricityEmissionRate.GAS}>Gas</Option>
                                <Option value={ElecricityEmissionRate.OEL}>Oel</Option>
                                <Option value={ElecricityEmissionRate.ELECTRIC}>Electric</Option>
                            </Select>
                        </td>
                        <td>
                            <Input
                                value={row.area_m2}
                                onChange={(event) => {
                                    setWarehouseRowData(index, "area_m2", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.area_m2}
                                onChange={(event) => {
                                    setWarehouseRowData(index, "area_cooled_m2", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.itemsdelivered_year}
                                onChange={(event) => {
                                    setWarehouseRowData(index, "itemsdelivered_year", event.target.value);
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
