import AsyncStorage from "@react-native-async-storage/async-storage";
import { CitiesWeatherData } from "@/data/screens/location";

const KEY = "@mad_project:locations";

export type SavedLocation = {
  id: number;
  name: string;
  isFavorite?: boolean;
};

export async function getSavedLocations(): Promise<SavedLocation[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) {
      // initialize with example cities
      const defaults = CitiesWeatherData.map((c: any) => ({ id: c.id, name: c.name, isFavorite: c.id === 1 }));
      await AsyncStorage.setItem(KEY, JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(raw) as SavedLocation[];
  } catch (e) {
    console.warn("Failed to read saved locations", e);
    return CitiesWeatherData.map((c: any) => ({ id: c.id, name: c.name, isFavorite: c.id === 1 }));
  }
}

export async function saveLocations(locations: SavedLocation[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(locations));
  } catch (e) {
    console.warn("Failed to save locations", e);
  }
}

export async function addLocation(name: string) {
  const list = await getSavedLocations();
  const id = Math.max(0, ...list.map((l) => l.id)) + 1;
  const next = [...list, { id, name, isFavorite: false }];
  await saveLocations(next);
  return next;
}

export async function removeLocation(id: number) {
  const list = await getSavedLocations();
  const next = list.filter((l) => l.id !== id);
  await saveLocations(next);
  return next;
}

export async function toggleFavorite(id: number) {
  const list = await getSavedLocations();
  const next = list.map((l) => (l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
  await saveLocations(next);
  return next;
}

export default {
  getSavedLocations,
  saveLocations,
  addLocation,
  removeLocation,
  toggleFavorite,
};
