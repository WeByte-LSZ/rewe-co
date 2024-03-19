export interface ReportStore {
  [timestamp: string]: Report
}

export type Report = {
  title: string;
  description: string;
  truck: TruckProperties[],
  warehouse: {
    heating_co2: number,
    cooling_co2: number,
    light_co2: number,
    warehouses: WarehouseProperties[]
  },
  products: {
    co2: number,
    items: ProductProperties[]
  }
}

export type TruckProperties = {
  type: string,
  fuel_co2: number,
}

export type WarehouseProperties = {
  location: string;
  heating_co2: number;
  cooling_co2: number;
}

export type ProductProperties = {
  type: string;
  cooling: boolean;
  co2: number;
}
