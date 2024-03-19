export interface Truck {
    type: string,
    co2EmissionFactor: CO2EmissionsFactor,
    distanceDriven: number,
    additionalWeight: number,
    fuelConsumptionRate: number,
    cooled: boolean,
    solarPanels: boolean,
    maxWeight: number,
    maxVolume: number,
    numtrucks: number,
    avarageDistanceFromWarehouseToSupermarket: number,
    isDefault?: boolean
}

export interface ProductType {
    name: string,
    weight_kg: number,
    volume_l: number,
    transport_share: number,
    needsCooling: boolean
}

export interface Warehouse {
    name: string,
    area_m2: number,
    area_cooled_m2: number,
    itemsdelivered_year: number,
    solarPanels: boolean,
    electricityEmissionRate: ElecricityEmissionRate,
}

export enum ElecricityEmissionRate {
    GAS = 0.49,
    OEL = 0.74,
    ELECTRIC = 0.4,
}

export enum CO2EmissionsFactor {
    DIESEL = 2.63,
    ULSD = 2.50,
    BIO = 2.53,
} 
