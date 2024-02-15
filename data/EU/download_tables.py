import pandas as pd
import json
import requests
from io import StringIO

# Define the URL for the CSV file
url = "https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/env_waseleeos/?format=SDMX-CSV&i"

# Fetch the CSV data from the URL
response = requests.get(url)
csv_data = response.content.decode('utf-8')

# Read the CSV data into a DataFrame
df = pd.read_csv(StringIO(csv_data))

# Function to filter data based on country, unit, and waste operation
def filter_data(country, unit, waste_operation):
    filtered_df = df[(df['geo'] == country) & (df['unit'] == unit) & (df['wst_oper'] == waste_operation)]
    return filtered_df

# Example: Filter data for each country, unit, and waste operation
countries = df['geo'].unique()
units = df['unit'].unique()
waste_operations = df['wst_oper'].unique()

for country in countries:
    for unit in units:
        for waste_operation in waste_operations:
            filtered_data = filter_data(country, unit, waste_operation)
            # Extract datapoints as arrays of objects
            datapoints = [{str(row['TIME_PERIOD']): row['OBS_VALUE']} for index, row in filtered_data.iterrows()]
            
            # Export datapoints to JSON file
            filename = f"{country}_{waste_operation}_{unit}.json"  # Example file name: "US_kg_COL.json"
            with open(filename, 'w') as file:
                json.dump(datapoints, file)

print("Data exported successfully.")
