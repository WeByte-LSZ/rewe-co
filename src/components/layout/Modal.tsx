import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { Box, Table } from "@mui/joy";
import { ProductType, Truck, Warehouse } from "@/types/InputTypes";
import TruckTable from "../tables/truckTable";
import ProductTable from "../tables/ProductTable";

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [truckData, setTruckData] = React.useState<Truck[]>([]);
  const [productData, setProductData] = React.useState<ProductType[]>([]);
  const [warehouseData, setWarehouseData] = React.useState<Warehouse[]>([]);

  const setTruckRowData = (index: number, key: keyof Truck, value: string | number) => {
    setTruckData((prevData) => {
      return prevData.map((row, i) => {
        if (i === index) {
          return { ...row, [key]: value };
        }
        return row;
      });
    });
  };

  const setProductRowData = (index: number, key: keyof ProductType, value: string | number) => {
    setProductData((prevData) => {
      return prevData.map((row, i) => {
        if (i === index) {
          return { ...row, [key]: value };
        }
        return row;
      });
    });
  };

  const setWarehouseRowData = (index: number, key: keyof Warehouse, value: string | number) => {
    setWarehouseData((prevData) => {
      return prevData.map((row, i) => {
        if (i === index) {
          return { ...row, [key]: value };
        }
        return row;
      });
    });
  };

  

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        Neuer Report
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ display: "flex", width: "100%" }}>
          <DialogTitle>Erstelle einen neuen Report.</DialogTitle>
          <DialogContent>Fülle die benötigten Daten dafür aus.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2} sx={{ display: "flex" }}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Erstellen</Button>
            </Stack>
            <TruckTable truckData={truckData} setTruckData={setTruckData} setTruckRowData={setTruckRowData} />

            <ProductTable productData={productData} setProductData={setProductData} setProductRowData={setProductRowData} />
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
