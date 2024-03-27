// --Overall Calculation--
export interface Calculation {
	title: string,
	description: string,
	calculations: SingleCalculation[],
}

export interface SingleCalculation {
	id: string,
	function: Function,
}



// --Vehicles--
export interface VehicleCalculation extends SingleCalculation {
	distance: number, //kilometers
	weight: number, //kilograms
	kWhUsedForCooling: number,
}

export interface ElectricVehicleCalculation extends VehicleCalculation {
	energyEfficiency: number, //kWh used per 100 kilometers
}

export interface FuelVehicleCalculation extends VehicleCalculation {
	fuel: Fuel,
	fuelConsumptionRate: number, //liters used per 100 kilometers
}

export enum Fuel {
	PETROLEUM = 1,
	BIODIESEL = 1,
	SYNTHETIC_DIESEL = 1,
	GASOLINE = 1,
	COMPRESSED_NATURAL_GAS = 1,
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
	NATURAL_GAS = 1,
	PROPANE = 1,
	OIL = 1,
}



// --Solar Panels--
export interface SolarPanelCalculation extends SingleCalculation {
	kWhProducedBySolarPanels: number,
}



// --Electricity--
export interface ElectricityCalculation extends SingleCalculation {
	kWh: number, //excluding kWh included in other calculations: for example cooling or vehicle kWh cooling
	electricityType: ElectricityType,
}

export enum ElectricityType {
	RENEWABLE_ENERGY = 1,
	NATURAL_GAS = 1,
	OIL = 1,
	CONVENTIONAL_ENERGY_MIX = 1,
}