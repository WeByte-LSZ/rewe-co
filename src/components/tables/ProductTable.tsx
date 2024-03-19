import { ProductType } from "@/types/InputTypes";
import { Box, Button, Checkbox, Input, Table } from "@mui/joy";

export default function ProductTable({ productData, setProductData, setProductRowData}: { productData: ProductType[], setProductData: Function, setProductRowData: Function }) {
    return (<>
        <Table
            borderAxis="bothBetween"
            hoverRow
        >
            <thead>
                <tr>
                    <th style={{ width: "var(--Table-firstColumnWidth)" }}>
                        Product Name
                    </th>
                    <th style={{ width: 170 }}>Weight &nbsp;(kg)</th>
                    <th style={{ width: 170 }}>Volume&nbsp;(L)</th>
                    <th style={{ width: 170 }}>Share of Transport &nbsp;(Percent)</th>
                    <th style={{ width: 170 }}>Needs Cooling</th>
                    <th
                        aria-label="last"
                        style={{ width: "var(--Table-lastColumnWidth)" }}
                    />
                </tr>
            </thead>
            <tbody>
                {productData.map((row, index) => (
                    <tr>
                        <td>
                            <Input
                                value={row.name}
                                onChange={(event) => {
                                    setProductRowData(index, "name", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.weight_kg}
                                onChange={(event) => {
                                    setProductRowData(index, "weight_kg", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.volume_l}
                                onChange={(event) => {
                                    setProductRowData(index, "volume_l", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Input
                                value={row.transport_share}
                                onChange={(event) => {
                                    setProductRowData(index, "transport_share", event.target.value);
                                }}
                            ></Input>
                        </td>
                        <td>
                            <Checkbox checked={row.needsCooling} onChange={(event) => {
                                setProductRowData(index, "needsCooling", event.target.value);
                            }} />
                        </td>
                        <td>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                    size="sm"
                                    variant="soft"
                                    color="danger"
                                    onClick={() => {
                                        setProductData((prevData: ProductType[]) =>
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
                setProductData((prevData: ProductType[]) => [
                    ...prevData,
                    {},
                ]);
            }}
        >
            Add
        </Button>

    </>)
}

