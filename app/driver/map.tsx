import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import SocketService from "@/app/services/SocketService";

const DriverMap = () => {
    const [customerLocation, setCustomerLocation] = useState<any>(null);
    const [driverLocation, setDriverLocation] = useState({
        latitude: 31.4025,
        longitude: 74.2192, // Initial driver location
    });
    const mapRef = useRef<MapView>(null);
    const orderId = "order_123";
    const GOOGLE_MAPS_APIKEY = "YOUR_API_KEY"; // Replace with valid key for directions

    useEffect(() => {
        SocketService.connect();
        SocketService.joinRoom(orderId);

        SocketService.subscribeToLocation((data) => {
            if (data.role === "customer") {
                console.log("Received customer location:", data.location);
                setCustomerLocation(data.location);
            }
        });

        return () => {
            SocketService.disconnect();
        };
    }, []);

    useEffect(() => {
        if (customerLocation && mapRef.current) {
            mapRef.current.fitToCoordinates([driverLocation, customerLocation], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, [customerLocation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Driver View</Text>
                <Text style={styles.subTitle}>Tracking Customer</Text>
            </View>

            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 31.4025,
                    longitude: 74.2192,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Driver Marker */}
                <Marker coordinate={driverLocation} title="You (Driver)">
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/732/732200.png" }}
                        style={{ width: 40, height: 40 }}
                    />
                </Marker>

                {/* Customer Marker */}
                {customerLocation && (
                    <Marker coordinate={customerLocation} title="Customer">
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png" }}
                            style={{ width: 40, height: 40 }}
                        />
                    </Marker>
                )}

                {/* Route */}
                {customerLocation && (
                    // Note: MapViewDirections requires a valid API Key to work. 
                    // Using Polyline as fallback for demo if key is missing.
                    <Polyline
                        coordinates={[driverLocation, customerLocation]}
                        strokeColor="#fd5c63"
                        strokeWidth={4}
                    />
                )}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {customerLocation ? "Customer is sharing location" : "Waiting for customer location..."}
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default DriverMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e1e2e",
    },
    header: {
        padding: 15,
        backgroundColor: "#2e2e3e",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    subTitle: {
        color: "#aaa",
        fontSize: 14,
    },
    map: {
        flex: 1,
    },
    footer: {
        padding: 20,
        backgroundColor: "#2e2e3e",
        alignItems: "center",
    },
    footerText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    }
});
