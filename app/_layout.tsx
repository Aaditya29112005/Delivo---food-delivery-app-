import "@/global.css";
import { useContext, useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from "expo-status-bar";
import { ThemeContext, ThemeProvider } from "@/contexts/theme-context";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

// Background fetch + notifications MVP
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import weatherService from "@/utils/weatherService";
import weatherCache from "@/utils/weatherCache";

const BACKGROUND_FETCH_TASK = "BACKGROUND_FETCH_WEATHER";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const forecast = await weatherService.fetchForecastForLocation();
    await weatherCache.setCachedForecast(forecast.name || "My Location", forecast as any);

    // Simple severe weather heuristic
    const severe = (forecast.temperature && forecast.temperature >= 40) ||
      (forecast.AQI && forecast.AQI > 150) ||
      (forecast.weather && /(thunder|storm|tornado|hurricane|severe|rain)/i.test(forecast.weather));

    if (severe) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Severe weather near ${forecast.name || "you"}`,
          body: `${forecast.weather} — ${forecast.temperature}°C. Check the app for details.`,
        },
        trigger: null,
      });
    }

    return BackgroundFetch.Result.NewData;
  } catch (err) {
    console.warn("Background fetch failed", err);
    return BackgroundFetch.Result.Failed;
  }
});


const MainLayout = () => {
  const { colorMode }: any = useContext(ThemeContext);
  const [fontsLoaded] = useFonts({
    "dm-sans-regular": DMSans_400Regular,
    "dm-sans-medium": DMSans_500Medium,
    "dm-sans-bold": DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    (async () => {
      try {
        // Request notification permissions
        await Notifications.requestPermissionsAsync();

        // Register background fetch (best-effort; platform limitations exist)
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        if (!isRegistered) {
          await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 60 * 30, // 30 minutes
            stopOnTerminate: false,
            startOnBoot: true,
          });
        }
      } catch (e) {
        console.warn("Background fetch/notifications setup failed", e);
      }
    })();
  }, []);

  return (
    <GluestackUIProvider mode={colorMode}>
      <StatusBar translucent/>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
