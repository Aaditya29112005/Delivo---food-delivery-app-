import React, { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "@/components/ui/scroll-view";
import Animated, { FadeInUp } from "react-native-reanimated";
import { CitiesWeatherData } from "@/data/screens/location";
import CustomHeader from "@/components/shared/custom-header";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Star } from "lucide-react-native";
import locationsStore from "@/utils/locationsStore";
import weatherCache from "@/utils/weatherCache";
import { Text } from "@/components/ui/text";

type Cached = {
  temperature?: number;
  weather?: string;
  fetchedAt?: number;
};

const Location = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const [locations, setLocations] = useState<any[]>(CitiesWeatherData);
  const [newLocation, setNewLocation] = useState("");
  const [cached, setCached] = useState<Cached | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const saved = await locationsStore.getSavedLocations();
        setLocations(saved);
      } catch (e) {
        setLocations(CitiesWeatherData);
      }
    })();
  }, []);

  const handleAddLocation = async () => {
    if (!newLocation.trim()) return;
    const next = await locationsStore.addLocation(newLocation.trim());
    setLocations(next);
    setNewLocation("");
  };

  const handleToggleFavorite = async (id: number) => {
    const next = await locationsStore.toggleFavorite(id);
    setLocations(next);
  };

  return (
    <VStack space="md" className="flex-1 bg-background-0">
      <CustomHeader
        variant="search"
        title="Location"
        label="Search for a city"
      />
      <ScrollView
        contentContainerClassName="gap-3 px-5"
        showsVerticalScrollIndicator={false}
      >
        {cached && (
          <Animated.View entering={FadeInUp} className="px-4 py-3 rounded-lg bg-background-1">
            <Text className="font-bold">Cached — {cached.weather} • {cached.temperature}°C</Text>
            {cached.fetchedAt && (
              <Text className="text-xs">Updated: {new Date(cached.fetchedAt).toLocaleString()}</Text>
            )}
          </Animated.View>
        )}
        <Animated.View entering={FadeInUp} className="px-4">
          <Input variant="outline" className="rounded-xl mb-3" size="md">
            <InputSlot>
              <InputIcon as={Icon} />
            </InputSlot>
            <InputField placeholder="Add a city" value={newLocation} onChangeText={setNewLocation} />
          </Input>
          <Button onPress={handleAddLocation} className="mb-3">
            <Text className="font-medium text-background-900">Add location</Text>
          </Button>
        </Animated.View>

        {locations.map((loc, index) => (
          <Animated.View key={loc.id} entering={FadeInUp.delay(index * 50).springify().damping(12)}>
            <Animated.View className="p-4 rounded-lg bg-background-100 flex-row justify-between items-center mx-4 mb-3">
              <Animated.View>
                <Text className="font-semibold text-typography-700">{loc.name}</Text>
                <Text className="text-xs text-typography-600">Saved location</Text>
              </Animated.View>
              <Animated.View>
                <Button variant={loc.isFavorite ? "solid" : "outline"} onPress={() => handleToggleFavorite(loc.id)}>
                  <Icon as={Star} />
                </Button>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        ))}
      </ScrollView>
    </VStack>
  );
};

export default Location;
