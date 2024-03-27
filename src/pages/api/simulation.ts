import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import { Report } from '@/types/Report';
import { Calculation, CoolingCalculation, ElectricVehicleCalculation, ElectricityCalculation, ElectricityType, FuelVehicleCalculation, HeatingCalculation, SingleCalculation, SolarPanelCalculation } from '../../types/Calculation';

type ResponseData = { data: string } | { err: string }

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {

	const body = req.body;
	const calculation: Calculation = body.calculation as unknown as Calculation;

	// const calculateCube: SingleCalculation = {
	// 	id: 'cube',
	// 	function: fuelVehicleCalculation,
	// };

	
	// const calculation: Calculation = {
	// 	title: "a",
	// 	description: "b",
	// 	calculations: [
	// 		calculateCube,
	// 	],
	// };

	const report: Report = calculate(calculation);

	writeIntoJson(report);

	return res.status(200).json({ data: "Done." });
}

export function calculate(calculation: Calculation) {
	var report: Report = {
		title: calculation.title,
		description: calculation.description,

		co2_kg: 0,
		eur: 0,

		vehicles: {
			co2_kg: 0,
			eur: 0,
			vehicles: [],
		},

		cooling: {
			co2_kg: 0,
			eur: 0,
		},

		heating: {
			co2_kg: 0,
			eur: 0,
		},

		solar_panels: {
			co2_kg: 0,
			eur: 0,
		},

		electricity: {
			co2_kg: 0,
			eur: 0,
		},
	}

	for (const calc of calculation.calculations) {
		calc.function(report);
	}

	const eur: number = co2ToEur(report.co2_kg);
	report.eur = eur;

	return report;
}

function co2ToEur(co2_kg: number) {
	const eur_per_ton_co: number = 45;

	var co2_tons: number = co2_kg / 1000;
	var eur: number = co2_tons * eur_per_ton_co;

	return eur;
}

function fuelVehicleCalculation(report: Report, calc: FuelVehicleCalculation) {
	console.log("executed fuelVehicleCalculation");

	const kg_fuel_to_liters: number = 1.35;
	const marginal_fuel_burn_rate: number = 0.024;
	const fuel_usage_per_kWh: number = 0.15;
	
	const average_liters_fuel_used_per_kilometer: number = calc.fuelConsumptionRate / 100;
	const additional_weight_liters_fuel_used_per_kilometer: number = calc.weight * marginal_fuel_burn_rate * kg_fuel_to_liters / 1000;

	const liters_of_fuel_used_per_kilometer: number = average_liters_fuel_used_per_kilometer + additional_weight_liters_fuel_used_per_kilometer;
	
	const liters_of_fuel_used: number = liters_of_fuel_used_per_kilometer * calc.distance;
	const additional_kWh_liters_fuel_used: number = calc.kWhUsedForCooling * fuel_usage_per_kWh;

	const final_liters_of_fuel_used: number = liters_of_fuel_used + additional_kWh_liters_fuel_used;

	const co2_kg: number = final_liters_of_fuel_used * calc.fuel;
	const eur: number = co2ToEur(co2_kg);

	report.vehicles.co2_kg += co2_kg;
	report.vehicles.eur += eur;

	report.vehicles.vehicles.push({name: calc.id, co2_kg: co2_kg, eur: eur});
}

function electricVehicleCalculation(report: Report, calc: ElectricVehicleCalculation) {
	console.log("executed electricVehicleCalculation");

	const electric_cars_co2_emissions_factor: number = 0.9;

	const average_kWh_used_per_kilometer: number = calc.energyEfficiency / 100;
	
	const average_kWh_used: number = average_kWh_used_per_kilometer * calc.distance;
	const kWh_used: number = average_kWh_used + calc.kWhUsedForCooling;

	const co2_kg: number = kWh_used * electric_cars_co2_emissions_factor;
	const eur: number = co2ToEur(co2_kg);

	report.vehicles.co2_kg += co2_kg;
	report.vehicles.eur += eur;

	report.vehicles.vehicles.push({name: calc.id, co2_kg: co2_kg, eur: eur});
}

function coolingCalculation(report: Report, calc: CoolingCalculation) {
	console.log("executed coolingCalculation");

	const co2_emissions_factor: number = 0.9;

	const co2_kg: number = calc.kWhUsedForCooling * co2_emissions_factor;
	const eur: number = co2ToEur(co2_kg);

	report.cooling.co2_kg = co2_kg;
	report.cooling.eur = eur;
}

function heatingCalculation(report: Report, calc: HeatingCalculation) {
	console.log("executed heatingCalculation");

	const cubic_feet_of_fuel: number = calc.ccf / 100;

	const co2_kg: number = cubic_feet_of_fuel * calc.heatingFuel;
	const eur: number = co2ToEur(co2_kg);

	report.heating.co2_kg = co2_kg;
	report.heating.eur = eur;
}

function solarPanelCalculation(report: Report, calc: SolarPanelCalculation) {
	console.log("executed solarPanelCalculation");

	const co2_kg: number = calc.kWhProducedBySolarPanels * ElectricityType.RENEWABLE_ENERGY;
	const eur: number = co2ToEur(co2_kg);

	report.solar_panels.co2_kg = co2_kg;
	report.solar_panels.eur = eur;
}

function electricityCalculation(report: Report, calc: ElectricityCalculation) {
	console.log("executed electricityCalculation");

	const co2_kg: number = calc.kWh * calc.electricityType;
	const eur: number = co2ToEur(co2_kg);

	report.electricity.co2_kg = co2_kg;
	report.electricity.eur = eur;
}

function writeIntoJson(json: Report) {

	function padTwoDigits(num: number) {
		return num.toString().padStart(2, "0");
	}

	function dateInYyyyMmDdHhMmSs(date: Date, dateDiveder: string = "-") {
		// :::: Exmple Usage ::::
		// The function takes a Date object as a parameter and formats the date as YYYY-MM-DD hh:mm:ss.
		// 👇️ 2023-04-11 16:21:23 (yyyy-mm-dd hh:mm:ss)
		//console.log(dateInYyyyMmDdHhMmSs(new Date()));

		//  👇️️ 2025-05-04 05:24:07 (yyyy-mm-dd hh:mm:ss)
		// console.log(dateInYyyyMmDdHhMmSs(new Date('May 04, 2025 05:24:07')));
		// Date divider
		// 👇️ 01/04/2023 10:20:07 (MM/DD/YYYY hh:mm:ss)
		// console.log(dateInYyyyMmDdHhMmSs(new Date(), "/"));
		return (
			[
				date.getFullYear(),
				padTwoDigits(date.getMonth() + 1),
				padTwoDigits(date.getDate()),
			].join(dateDiveder) +
			" " +
			[
				padTwoDigits(date.getHours()),
				padTwoDigits(date.getMinutes()),
				padTwoDigits(date.getSeconds()),
			].join(":")
		);
	}

	var filePath: string = "data.json";
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		// Parse the existing JSON data
		let existingJsonData: any = {};
		if (data) {
			existingJsonData = JSON.parse(data);
		}

		// Append your JSON object to the existing data
		let timestamp = dateInYyyyMmDdHhMmSs(new Date())
		existingJsonData[timestamp] = json;

		// Convert the updated JSON data to a string
		const updatedJsonString = JSON.stringify(existingJsonData);

		// Write the updated JSON data back to the file
		fs.writeFile(filePath, updatedJsonString, 'utf8', (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('File updated successfully.');
		});
	});
}
