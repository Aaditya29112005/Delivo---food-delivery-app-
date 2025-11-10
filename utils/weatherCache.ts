import AsyncStorage from "@react-native-async-storage/async-storage";
import { Forecast } from "./weatherService";

const CACHE_KEY_PREFIX = "@mad_project:forecast:";

export async function getCachedForecast(location = "My Location"): Promise<Forecast | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY_PREFIX + location);
    if (!raw) return null;
    return JSON.parse(raw) as Forecast;
  } catch (e) {
    console.warn("Failed to read forecast cache", e);
    return null;
  }
}

export async function setCachedForecast(location = "My Location", data: Forecast) {
  try {
    await AsyncStorage.setItem(CACHE_KEY_PREFIX + location, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to write forecast cache", e);
  }
}

export default {
  getCachedForecast,
  setCachedForecast,
};
