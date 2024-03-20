export interface ReportStore {
  [timestamp: string]: Report
}

export type Report = {
  title: string;
  description: string; //weiss nd ob sinnvoll
  maximum: number,
  co2_total: number,
  eur_total: number
  truck_types: {
    fuel_co2: number,
    fuel_eur: number,
    solar_co2: number,
    solar_eur: number,
    truck_types_data: TruckProperties[],
  }
  warehouses: {
    total_co2: number,
    total_eur: number,
    solar_co2: number,
    solar_eur: number,
    heating_co2: number,
    heating_eur: number,
    cooling_co2: number,
    cooling_eur: number,
    air_conditioning_co2: number,
    air_conditioning_eur: number,
    warehouses_data: WarehouseProperties[]
  },
  product_types: {
    total_co2: number,
    total_eur: number,
    product_types_data: ProductProperties[]
  }
}

export type TruckProperties = {
  name: string,
  fuel_co2: number,
  fuel_eur: number,
  solar_co2: number,
  solar_eur: number,
  optimized_fuel_co2: number,
  optimized_fuel_eur: number,
}

export type WarehouseProperties = {
  name: string;
  total_co2: number,
  total_eur: number,
  heating_co2: number;
  heating_eur: number;
  cooling_co2: number;
  cooling_eur: number;
  air_conditioning_co2: number;
  air_conditioning_eur: number;
  solar_co2: number;
  solar_eur: number;
}

export type ProductProperties = {
  name: string;
  cooling: boolean;
  optimized_co2: number;
  optimized_eur: number;
}
