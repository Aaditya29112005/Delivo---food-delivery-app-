import React, { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import LocationCard from "@/components/screens/location/location-card";
import { ScrollView } from "@/components/ui/scroll-view";
import Animated, { FadeInUp } from "react-native-reanimated";
import { CitiesWeatherData } from "@/data/screens/location";
import CustomHeader from "@/components/shared/custom-header";
import weatherCache from "@/utils/weatherCache";
import { Text } from "@/components/ui/text";

type Cached = {
  temperature?: number;
  weather?: string;
  fetchedAt?: number;
};

const Location = () => {
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const [cached, setCached] = useState<Cached | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const c = await weatherCache.getCachedForecast("My Location");
        if (c) setCached(c as Cached);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

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
        {CitiesWeatherData.map((card, index) => {
          return (
            <Animated.View
              key={card.id}
              entering={FadeInUp.delay(index * 100)
                .springify()
                .damping(12)}
            >
              <LocationCard
                id={card.id}
                name={card.name}
                time={card.time}
                temperature={card.temperature}
                weather={card.weather}
                AQI={card.AQI}
                wind={card.wind}
                highest={card.highest}
                lowest={card.lowest}
                isSelected={selectedCard === card.id}
                setSelectedCard={setSelectedCard}
              />
            </Animated.View>
          );
        })}
      </ScrollView>
    </VStack>
  );
};

export default Location;
