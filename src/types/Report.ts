export interface ReportStore {
	[timestamp: string]: Report
}

export interface Report {
	title: string,
	description: string,

	co2_kg: number,
	eur: number,

	vehicles: {
		co2_kg: number,
		eur: number,
		vehicles: Vehicle[],
	}

	cooling: {
		co2_kg: number,
		eur: number,
	}

	heating: {
		co2_kg: number,
		eur: number,
	}

	solar_panels: {
		co2_kg: number,
		eur: number,
	}

	electricity: {
		co2_kg: number,
		eur: number,
	}
}

export interface Vehicle {
	name: string,
	co2_kg: number,
	eur: number,
}