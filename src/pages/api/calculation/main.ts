import { Calculation, ElectricVehicleCalculation, SingleCalculation } from "./types/types";

export function calculate(calculation: Calculation) {
	for(const calc of calculation.calculations) {
		console.log(isElectricVehicle(calc));
	}
}

function isElectricVehicle(obj: SingleCalculation): obj is ElectricVehicleCalculation {
    return 'energyEfficiency' in obj;
}