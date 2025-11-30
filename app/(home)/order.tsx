import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable, Image } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SocketService from "@/app/services/SocketService";
import LocationService from "@/app/services/LocationService";

const Order = () => {
  const params = useLocalSearchParams();
  console.log("Received Order Params:", params);
  const router = useRouter();
  const [tip, setTip] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const orderId = "order_123"; // Dummy Order ID for demo
  const rawDeliveryOption = params.deliveryOption;
  const deliveryOption = (Array.isArray(rawDeliveryOption) ? rawDeliveryOption[0] : rawDeliveryOption) || "standard";
  const trackingInterval = deliveryOption === "premium" ? 2500 : 6000;

  const time = moment().format("LT");
  const mapView = useRef<MapView>(null);
  const [coordinates] = useState([
    { latitude: 31.4025, longitude: 74.2192 },
    { latitude: 31.4811, longitude: 74.3030 },
  ]);
  const [driverLocation, setDriverLocation] = useState(coordinates[0]);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.01;
      if (progress > 1) progress = 0; // Loop the animation

      const newLat = coordinates[0].latitude + (coordinates[1].latitude - coordinates[0].latitude) * progress;
      const newLng = coordinates[0].longitude + (coordinates[1].longitude - coordinates[0].longitude) * progress;

      setDriverLocation({ latitude: newLat, longitude: newLng });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Start Real-time Tracking
    SocketService.connect();
    SocketService.joinRoom(orderId);

    const startLocationUpdates = async () => {
      setIsTracking(true);
      await LocationService.startTracking((location) => {
        // console.log("Sending location:", location.coords);
        SocketService.emitLocation(orderId, location.coords, 'customer');
      }, trackingInterval);
    };

    startLocationUpdates();

    return () => {
      LocationService.stopTracking();
      SocketService.disconnect();
      setIsTracking(false);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (mapView.current) {
        mapView.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
        });
      }
    }, [coordinates])
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={24}
          color="black"
          style={styles.backIcon}
        />
        <Text style={styles.headerTitle}>{params?.name}</Text>
      </View>
      <View style={styles.deliveryInfo}>
        <View style={{ paddingTop: 10, paddingLeft: 10 }}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            {isTracking ? "Live Location Sharing Active" : "Initializing Tracking..."}
          </Text>
        </View>
        <View>
          <Text style={{ color: "gray", fontSize: 14, fontWeight: "500", marginTop: 10 }}>
            Delivery in <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>{deliveryOption === "premium" ? "10 - 20 mins" : "30 - 45 mins"}</Text>
          </Text>
          {deliveryOption === "premium" && (
            <View style={{ backgroundColor: "#fd5c63", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: 5 }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>PREMIUM</Text>
            </View>
          )}
        </View>
      </View>
      {coordinates.length > 0 && (
        <MapView
          ref={mapView}
          style={styles.map}
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Custom Source Marker */}
          <Marker coordinate={coordinates[0]} title="Bahria Town">
            <View style={styles.sourceMarker}>
              <FontAwesome5 name="map-marker-alt" size={32} color="green" />
            </View>
          </Marker>

          {/* Custom Destination Marker */}
          <Marker coordinate={coordinates[1]} title="COMSATS University">
            <View style={styles.destinationMarker}>
              <FontAwesome5 name="map-marker-alt" size={32} color="red" />
            </View>
          </Marker>

          {/* Route Polyline */}
          <Polyline coordinates={coordinates} strokeColor="blue" strokeWidth={3} />

          {/* Driver Marker */}
          <Marker coordinate={driverLocation} title="Driver">
            <View style={styles.driverMarker}>
              <Image
                source={require("../../assets/images/delivery_boy.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
          </Marker>
        </MapView>

      )}



      <View style={styles.bottomSheet}>
        <Text style={styles.orderStatus}>{params?.name} has accepted your order</Text>
        <View style={styles.tipSection}>
          <FontAwesome5 name="hand-holding-heart" size={28} color="#fc8019" />
          <View style={styles.tipContainer}>
            <Text style={styles.tipPrompt}>Tip your hunger Saviour</Text>
            <View style={styles.tipButtons}>
              {[30, 50, 70].map((amount, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setTip(amount)}
                  style={[
                    styles.tipButton,
                    amount === 50 && styles.mostTippedButton,
                  ]}
                >
                  <Text style={styles.tipButtonText}>Rs.{amount}</Text>
                  {amount === 50 && <Text style={styles.mostTippedText}>Most Tipped</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        {tip > 0 && (
          <View style={styles.tipConfirmation}>
            <Text style={styles.tipMessage}>
              Please pay ₹{tip} to your delivery agent at the time of delivery.
            </Text>
            <TouchableOpacity onPress={() => setTip(0)} style={styles.cancelTipButton}>
              <Text style={styles.cancelTipText}>(Cancel)</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  backIcon: {
    marginRight: 8,
    color: "#FFFFFF"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF"
  },
  deliveryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fd5c63",
    padding: 16,
    borderRadius: 8,
    margin: 8,
  },
  deliveryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600"
  },
  helpText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600"
  },
  map: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 8
  },
  bottomSheet: {
    backgroundColor: "#2e2e3e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  orderStatus: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFFFFF",
    marginVertical: 8
  },
  tipSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  },
  tipContainer: {
    marginLeft: 12
  },
  tipPrompt: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFFFFF"
  },
  tipButtons: {
    flexDirection: "row",
    marginTop: 12
  },
  tipButton: {
    backgroundColor: "#3e3e4e",
    borderRadius: 8,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  tipButtonText: {
    color: "#00d4ff",
    fontWeight: "600"
  },
  mostTippedButton: {
    backgroundColor: "#44334f",
    borderColor: "#fd5c63",
    borderWidth: 1
  },
  mostTippedText: {
    color: "#fd5c63",
    fontSize: 12,
    marginTop: 4
  },
  tipConfirmation: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#3a3a4a",
    borderRadius: 8
  },
  tipMessage: {
    color: "#fd5c63",
    fontWeight: "600",
    fontSize: 14
  },
  cancelTipButton: {
    marginTop: 8
  },
  cancelTipText: {
    color: "#FF6E6E",
    fontSize: 14,
    fontWeight: "700"
  },
  sourceMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});