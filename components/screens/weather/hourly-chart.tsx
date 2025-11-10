import React, { useContext, useMemo } from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { LineChart } from "react-native-gifted-charts";
import { ThemeContext } from "@/contexts/theme-context";
import { HourlyForecastData } from "@/data/screens/weather/hourly-tab";

const HourlyChart = () => {
  const { colorMode }: any = useContext(ThemeContext);

  const data = useMemo(() => {
    // map hourly data into chart points (add padding empty points for spacing)
    const points: any[] = [{}, ...HourlyForecastData.map((d: any) => ({ value: d.temperature, label: d.time })), {}];
    return points;
  }, []);

  return (
    <VStack className="p-3 rounded-2xl bg-background-100 gap-3">
      <HStack className="items-center gap-2">
        <Box className="h-7 w-7 bg-background-50 items-center justify-center rounded-full">
          <Text className="text-typography-400">Hr</Text>
        </Box>
        <Text className="font-dm-sans-medium text-typography-400">Hourly timeline</Text>
      </HStack>

      <LineChart
        curved
        isAnimated
        data={data}
        initialSpacing={0}
  hideDataPoints={false}
  dataPointsRadius={4}
  dataPointsColor={colorMode === "dark" ? "#F5F5F5" : "#5b416d"}
        rulesColor={colorMode === "dark" ? "#2f2f2f" : "#e6e6e6"}
        color={colorMode === "dark" ? "#f6a4ff" : "#b68cd4"}
        startFillColor={colorMode === "dark" ? "#3a243a" : "#f7eefb"}
        endFillColor={colorMode === "dark" ? "#1f1320" : "#ffffff"}
        spacing={28}
        stepHeight={28}
        yAxisThickness={0}
        xAxisLabelTextStyle={{ color: colorMode === "dark" ? "#F5F5F5" : "#262627", fontSize: 12 }}
        pointerConfig={{
          pointerStripColor: colorMode === "dark" ? "#888" : "#7a5475",
          pointerColor: colorMode === "dark" ? "#fff" : "#5b416d",
          radius: 6,
          pointerLabelComponent: (items: any) => {
            return (
              <VStack className="px-2 py-1 rounded bg-background-0">
                <Text className="font-dm-sans-medium">{items[0].value}°</Text>
                <Text className="text-xs text-typography-400">{items[0].label}</Text>
              </VStack>
            );
          },
        }}
      />
    </VStack>
  );
};

export default HourlyChart;
