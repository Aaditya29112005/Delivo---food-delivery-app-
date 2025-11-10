import { CitiesWeatherData } from "@/data/screens/location";

// Minimal weather service abstraction.
// If an OPENWEATHER_API_KEY environment variable is provided, this can be
// extended to fetch real data from OpenWeatherMap. For now, return sample data.

export type Forecast = {
  id?: number;
  name?: string;
  temperature?: number;
  weather?: string;
  AQI?: number;
  wind?: string;
  highest?: number;
  lowest?: number;
  fetchedAt?: number;
};

export async function fetchForecastForLocation(name = "My Location"): Promise<Forecast> {
  // Placeholder: prefer real API if API key present (not implemented here)
  const found = CitiesWeatherData.find((c: any) => c.name === name) || CitiesWeatherData[0];
  return {
    ...found,
    fetchedAt: Date.now(),
  } as Forecast;
}

export default {
  fetchForecastForLocation,
};
