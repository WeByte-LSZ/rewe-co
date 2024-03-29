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
import { CO2EmissionsFactor, ProductType, Truck, Warehouse } from "@/types/InputTypes";
import TruckTable from "../tables/TruckTable";
import ProductTable from "../tables/ProductTable";
import WarehouseTable from "../tables/WarehouseTable";

export default function BasicModalDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<String>("");
  const [description, setDescription] = React.useState<String>("");
  const [maxmoney, setMaxMoney] = React.useState<number>(0);
  const [avarageDistance, setAvarageDistance] = React.useState<number>(0);
  const [truckData, setTruckData] = React.useState<Truck[]>([
    {
      type: "Lieferwagen",
      co2EmissionFactor: CO2EmissionsFactor.DIESEL,
      distanceDriven: 0,
      additionalWeight: 0,
      fuelConsumptionRate: 0,
      cooled: false,
      solarPanels: false,
      maxWeight: 0,
      maxVolume: 0,
      numtrucks: 0,
      isDefault: true
    },
    {
      type: "Lieferwagen Gekühlt",
      co2EmissionFactor: CO2EmissionsFactor.DIESEL,
      distanceDriven: 0,
      additionalWeight: 0,
      fuelConsumptionRate: 0,
      cooled: true,
      solarPanels: false,
      maxWeight: 0,
      maxVolume: 0,
      numtrucks: 0,
      isDefault: true
    }

  ]);
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

  const pushReport = async () => {
    const data = {
      title: title,
      description: description,
      truckData: truckData,
      productData: productData,
      warehouseData: warehouseData,
      maximum: maxmoney,
      averageKilometersZustellung: avarageDistance,
    };


    try {
      const response = await fetch('/api/simulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
        <ModalDialog sx={{ display: "flex", width: "100%", overflow: "auto" }}>
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
                <FormLabel>Auswertung Name</FormLabel>
                <Input autoFocus required onChange={(event) => setTitle(event.target.value)}>{title}</Input>
              </FormControl>
              <FormControl>
                <FormLabel>Beschreibung</FormLabel>
                <Input required onChange={(event) => setDescription(event.target.value)}>{description}</Input>
              </FormControl>
              <FormControl>
                <FormLabel>CO2 Kosten Maximum</FormLabel>
                <Input type="number" required onChange={(event) => setMaxMoney(parseInt(event.target.value))}>{description}</Input>
              </FormControl>
              <FormControl>
                <FormLabel>Durchschnittliche Lieferdistanz (Letzter Lagerstätte bis Supermarkt)</FormLabel>
                <Input type="number"required onChange={(event) => setAvarageDistance(parseInt(event.target.value))}>{description}</Input>
              </FormControl>
              <Button type="submit" onClick={pushReport}>Erstellen</Button>
            </Stack>
            <TruckTable truckData={truckData} setTruckData={setTruckData} setTruckRowData={setTruckRowData} />
            <ProductTable productData={productData} setProductData={setProductData} setProductRowData={setProductRowData} />
            <WarehouseTable warehouseData={warehouseData} setWarehouseData={setWarehouseData} setWarehouseRowData={setWarehouseRowData} />
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
