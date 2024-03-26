// --Overall Calculation--
export interface Calculation {
	calculations: SingleCalculation[],
}

export interface SingleCalculation {
	id: string,
}



// --Vehicles--
export interface VehicleCalculation extends SingleCalculation {
	distance: number, //kilometers
	weight: number, //kilograms
	kWhUsedForCooling?: number,
}
 
export interface ElectricVehicleCalculation extends VehicleCalculation {
	energyEfficiency: number, //kWh used per 100 kilometers
}

export interface FuelVehicleCalculation extends VehicleCalculation {
	fuel: Fuel,
	fuelConsumptionRate: number, //liters used per 100 kilometers
}

export enum Fuel {
	PETROLEUM,
	BIODIESEL,
	SYNTHETIC_DIESEL,
	GASOLINE,
	COMPRESSED_NATURAL_GAS,
}



// --Cooling--
export interface CoolingCalculation extends SingleCalculation {
	kWhUsedForCooling: number,
}



// --Heating--
export interface HeatingCalculation extends SingleCalculation {
	ccf: number, //fuel used for heating in 100 cubic feet
	heatingFuel: HeatingFuel,
}

export enum HeatingFuel {
	NATURAL_GAS,
	PROPANE,
	OIL,
}



// --Solar Panels--
export interface SolarPanelCalculation extends SingleCalculation {
	kWhProducedBySolarPanels: number,
}



// --Electricity--
export interface Electricity extends SingleCalculation {
	kWh: number, //excluding kWh included in other calculations: for example cooling or vehicle kWh cooling
	electricityType: ElectricityType,
}

export enum ElectricityType {
	RENEWABLE_ENERGY,
	NATURAL_GAS,
	OIL,
	CONVENTIONAL_ENERGY_MIX,
}