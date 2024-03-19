export interface Truck {
    type: string,
    co2EmissionRate: number,
    distanceDriven: number,
    additionalWeight: number,
    fuelConsumptionRate: number,
    cooled: boolean,
    maxWeight: number,
    maxVolume: number,
    numtrucks: number,
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
    itemsdelivered_year: number
}
