import { time } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path';
import fs, { writeFileSync, readFileSync } from 'fs';
import { ProductType, Truck, Warehouse } from '@/types/InputTypes';
import { Report as OurReport, ProductProperties, TruckProperties, WarehouseProperties, ReportStore } from '@/types/Report';

type ResponseData = { data: string } | { err: string }

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	console.log(req.body);
	const body = req.body;

	var averageKilometersZustellung = 20;
	var maximum = 6000000;
	//var maximum = req.query.maximum as unknown as number;

	var vehicleTypes = body.truckData as unknown as Truck[];
	var warehouses = body.warehouseData as unknown as Warehouse[];
	var productTypes = body.productData as unknown as ProductType[];
	//var averageKilometersZustellung = req.query.averageKilometersZustellung as unknown as number;

	var report: OurReport = {
		title: req.body.title,
		description: req.body.description,
		maximum: maximum,
		co2_total: 0,
		eur_total: 0,
		truck_types: {
			fuel_co2: 0,
			fuel_eur: 0,
			solar_co2: 0,
			solar_eur: 0,
			truck_types_data: []
		},
		warehouses: {
			total_co2: 0,
			total_eur: 0,
			solar_co2: 0,
			solar_eur: 0,
			heating_co2: 0,
			heating_eur: 0,
			cooling_co2: 0,
			cooling_eur: 0,
			air_conditioning_co2: 0,
			air_conditioning_eur: 0,
			warehouses_data: [],
		},
		product_types: {
			total_co2: 0,
			total_eur: 0,
			product_types_data: [],
		},
	};
	// report.co2_total = 5000;
	// console.log(report);
	// return res.status(200).json({ data: "Done." });

	//run optimization
	var totalAmountOfItems = 0;
	for (const warehouse of warehouses) {
		totalAmountOfItems += warehouse.itemsdelivered_year;
	}

	var percentage: number = 1.0;

	var totalAmountOfUncooledVolume: number = 0; //liters
	var totalAmountOfCooledVolume: number = 0; //liters

	var totalAmountOfWeight: number = 0; //kg

	for (const productType of productTypes) {
		var factor = productType.transport_share / 100;
		percentage -= factor;

		if (productType.needsCooling) {
			totalAmountOfCooledVolume += productType.volume_l * totalAmountOfItems * factor;
		}
		if (!productType.needsCooling) {
			totalAmountOfUncooledVolume += productType.volume_l * totalAmountOfItems * factor;
		}
		totalAmountOfWeight += productType.weight_kg * totalAmountOfItems * factor;
	}
	totalAmountOfUncooledVolume += 0.2 * totalAmountOfItems * percentage; //0.2 representing the average volume in l
	totalAmountOfWeight += 0.1 * totalAmountOfItems * percentage; //0.1 representing the average weight in kg

	var defaultTruckUncooled: any;
	var defaultTruckCooled: any;

	for (const vehicle of vehicleTypes) {
		if (vehicle.isDefault) {
			if (vehicle.cooled) {
				defaultTruckCooled = vehicle;
			} else {
				defaultTruckUncooled = vehicle;
			}
		}
	}

	var defaultTruckUncooledVolume: number = defaultTruckUncooled.maxVolume;
	var defaultTruckCooledVolume: number = defaultTruckCooled.maxVolume;

	var drivesUncooled = totalAmountOfUncooledVolume / defaultTruckUncooledVolume;
	var drivesCooled = totalAmountOfCooledVolume / defaultTruckCooledVolume;

	//TODO: weight
	var kilometersUncooled = drivesUncooled * averageKilometersZustellung;
	var kilometersCooled = drivesCooled * averageKilometersZustellung;

	var co2_uncooled_default = getVehicleCO2(defaultTruckUncooled.co2EmissionFactor, kilometersUncooled, defaultTruckUncooled.maxWeight, defaultTruckUncooled.fuelConsumptionRate, false);
	var co2_cooled_default = getVehicleCO2(defaultTruckCooled.co2EmissionFactor, kilometersCooled, defaultTruckCooled.maxWeight, defaultTruckCooled.fuelConsumptionRate, true);

	for (const vehicle of vehicleTypes) {
		console.log(vehicle);

		var fuel_co2: number = getVehicleCO2(vehicle.co2EmissionFactor, vehicle.distanceDriven, vehicle.additionalWeight, vehicle.fuelConsumptionRate, vehicle.cooled);
		var fuel_eur: number = co2ToEur(fuel_co2);

		var solar_co2: number = vehicle.solarPanels ? co2WinSolarPanels(vehicle.maxVolume / 3) : 0;
		var solar_eur: number = vehicle.solarPanels ? co2ToEur(solar_co2) : 0;

		report.truck_types.fuel_co2 += fuel_co2 - solar_co2;
		report.truck_types.fuel_eur += fuel_eur - solar_eur;
		report.truck_types.solar_co2 += solar_co2;
		report.truck_types.solar_eur += solar_eur;

		var optimized_co2 = fuel_co2;
		var optimized_eur = fuel_eur;

		if (vehicle.isDefault) {
			if (vehicle.cooled) {
				optimized_co2 = co2_cooled_default;
				optimized_eur = co2ToEur(optimized_co2);
			} else {
				optimized_co2 = co2_uncooled_default;
				optimized_eur = co2ToEur(optimized_co2);
			}
		}

		var vehicleType: TruckProperties = { name: vehicle.type, fuel_co2: fuel_co2, fuel_eur: fuel_eur, solar_co2: solar_co2, solar_eur: solar_eur, optimized_fuel_co2: optimized_co2, optimized_fuel_eur: optimized_eur };
		report.truck_types.truck_types_data.push(vehicleType);
	}

	for (const warehouse of warehouses) {
		console.log(warehouse);

		var heating_co2: number = getWarehouseHeatingCO2(warehouse.area_m2, warehouse.electricityEmissionRate); // TODO: gas is placeholder
		var heating_eur: number = co2ToEur(heating_co2);

		var air_conditioning_co2: number = getWarehouseAirConditioningCO2(warehouse.area_m2 - warehouse.area_cooled_m2);
		var air_conditioning_eur: number = co2ToEur(air_conditioning_co2);

		var cooling_co2: number = getWarehouseCoolingCO2(warehouse.area_cooled_m2, 12);
		var cooling_eur: number = co2ToEur(cooling_co2);

		var solar_co2: number = co2WinSolarPanels(warehouse.area_m2);
		var solar_eur: number = co2ToEur(solar_co2);

		var total_co2 = heating_co2 + air_conditioning_co2 + cooling_co2 - solar_co2;
		var total_eur = heating_eur + air_conditioning_eur + cooling_eur - solar_eur;

		report.warehouses.total_co2 += total_co2;
		report.warehouses.total_eur += total_eur;

		report.warehouses.solar_co2 += solar_co2;
		report.warehouses.solar_eur += solar_eur;

		report.warehouses.heating_co2 += heating_co2;
		report.warehouses.heating_eur += heating_eur;

		report.warehouses.air_conditioning_co2 += air_conditioning_co2;
		report.warehouses.air_conditioning_eur += air_conditioning_eur;

		report.warehouses.cooling_co2 += cooling_co2;
		report.warehouses.cooling_eur += cooling_eur;

		var warehouseType: WarehouseProperties = { name: warehouse.name, total_co2: total_co2, total_eur: total_eur, heating_co2: heating_co2, heating_eur: heating_eur, cooling_co2: cooling_co2, cooling_eur: cooling_eur, air_conditioning_co2: air_conditioning_co2, air_conditioning_eur: air_conditioning_eur, solar_co2: solar_co2, solar_eur: solar_eur };
		report.warehouses.warehouses_data.push(warehouseType);
	}

	var productTypesCO2: number = 0;
	for (const product of productTypes) {
		productTypesCO2 += (product.needsCooling ? 2 : 1) * product.transport_share;
	}

	for (const product of productTypes) {
		console.log(product);

		var optimized_co2: number = (product.needsCooling ? 2 : 1) * product.transport_share / productTypesCO2;

		var productType: ProductProperties = { name: product.name, cooling: product.needsCooling, optimized_co2: optimized_co2, optimized_eur: co2ToEur(optimized_co2) };
		report.product_types.product_types_data.push(productType);
	}

	report.co2_total = report.truck_types.fuel_co2 + report.warehouses.total_co2;
	report.eur_total = report.truck_types.fuel_eur + report.warehouses.total_eur;

	var timestamp: string = new Date().getTime().toString();

	var report_store: ReportStore = { timestamp: report };

	console.log(report_store);

	writeIntoJson(report_store);

	return res.status(200).json({ data: "Done." });
}

function writeIntoJson(json: ReportStore) {

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

function co2ToEur(co2_kg: number) {
	return co2_kg / 1000 * 0.45;
}

function co2WinSolarPanels(squareMeters: number) {
	return 0.15 * 1000 * squareMeters * 0.2; // efficiency of solar panel * irresistence * square meters * CO2 emission factor
}

function getVehicleCO2(co2EmissionRate: number, distance_km: number, additional_weight_kg: number, fuelConsumptionRate: number, isCooling: boolean) {
	let fuel = distance_km * ((fuelConsumptionRate / 100) + (additional_weight_kg * 0.03 * 1.28 / 1000));
	fuel += isCooling ? distance_km * 0.005 : 0; //TODO Rethink 0.005
	let truckCO2 = fuel * co2EmissionRate;

	return truckCO2;
}

function getWarehouseHeatingCO2(squareMeters: number, electricityEmissionRate: number) {
	const timeInHours = 100 * 24;
	const powerConsumptionOfAllConditioners = (squareMeters / 150) * 11.25;

	return timeInHours * powerConsumptionOfAllConditioners * electricityEmissionRate;
}

function getWarehouseCoolingCO2(squareMeters: number, degreesForDeepCooling: number) {
	const timeInHours = 365 * 24; //whole year cooling to 12 degrees
	const powerConsumptionOfAllConditioners = Math.ceil(squareMeters / 150 * 11.25 * ((21 - degreesForDeepCooling) * 0.3 + 1)); // 150,000 square meters; I think it's more than 0.3 for each degree
	const electricityEmissionRate = 0.4; //electro

	return timeInHours * powerConsumptionOfAllConditioners * electricityEmissionRate;
}

function getWarehouseAirConditioningCO2(squareMeters: number) {
	const timeInHours = 365 * 24 * 0.4; // summer
	const powerConsumptionOfAllConditioners = Math.ceil(squareMeters / 150 * 11.25);
	const electricityEmissionRate = 0.4; //electro

	return timeInHours * powerConsumptionOfAllConditioners * electricityEmissionRate;
}