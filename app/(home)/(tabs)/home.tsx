import { View, Alert, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import Crousel from "@/components/Crousel";
import Hotel from "@/components/Hotel";
import LocationBar from "@/components/LocationBar";
import Search from "@/components/Search";
import RestaurantTagline from "@/components/RestaurantTagline";
import CartFloatingButton from "@/components/CartFloatingButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface Image {
  id: string;
  image: string;
  description: string;
}

interface hotel {
  id: string;
  featured_image: string;
  images?: Image[];
  name: string;
  cuisines: string;
  time: string;
  average_cost_for_two?: number;
  aggregate_rating: number;
  adress: string;
  smalladress: string;
  offer: string;
  no_of_Delivery: number;
  latitude: number;
  longitude: number;
}

export default function Index() {
  const [currentAddress, setCurrentAddress] = useState("fetching location...");
  const cart = useSelector((state: RootState) => state.cart.cart);
  const hotels: hotel[] = [
    {
      id: "0",
      featured_image:
        "https://images.unsplash.com/photo-1460306855393-0410f61241c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fHww",
      images: [
        {
          id: "0",
          image:
            "https://b.zmtcdn.com/data/pictures/chains/8/51828/68d04135bbac1e3d5ff5a87d45974da1.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
          description: "Desi Burrito • Rs249",
        },
        {
          id: "0",
          image:
            "https://b.zmtcdn.com/data/pictures/chains/8/51828/1f8008fc1cec3cd7ea2b559c32b1e642.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
          description: "Indain Burrito • Rs149",
        },
      ],
      name: "Burger Point",
      cuisines: "North Indian • Fast Food • 160 for one",
      time: "35 - 40 min • 1Km",
      average_cost_for_two: 1600,
      aggregate_rating: 4.3,
      adress: "Shop 4, Koregaon Park, Pune",
      smalladress: "Koregaon Park, Pune",
      offer: "₹80 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9916,
      longitude: 77.5712,
    },

    {
      id: "1",
      featured_image:
        "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "Qubitos - The Terrace Cafe",
      cuisines: "Thai, European, Mexican",
      average_cost_for_two: 1500,
      aggregate_rating: 4.5,
      adress: "Viman Nagar, Pune",
      smalladress: "Viman Nagar, Pune",
      offer: "₹80 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "44 min",
    },

    {
      id: "2",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCYsmzl1yfX0MwTN-E_uHC-bk3p181VzjIA&usqp=CAU",
      name: "The Hudson Cafe",
      cuisines: "Cafe, Italian, Continental",
      average_cost_for_two: 850,
      aggregate_rating: 4.3,
      adress: "FC Road, Deccan Gymkhana, Pune",
      smalladress: "FC Road, Pune",
      offer: "₹60 OFF",
      no_of_Delivery: 1800,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "20 min",
    },

    {
      id: "3",
      featured_image:
        "https://images.unsplash.com/photo-1623848932096-b196440bb57b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hyaW0lMjByZXN0dXJhbnR8ZW58MHx8MHx8fDA%3D",
      name: "Summer House Cafe",
      cuisines: "Italian, Continental",
      average_cost_for_two: 1850,
      aggregate_rating: 4.1,
      adress: "Kalyani Nagar, Pune",
      smalladress: "Kalyani Nagar, Pune",
      offer: "₹50 OFF",
      no_of_Delivery: 1700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "38 min",
    },

    {
      id: "4",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXumfbiH2jcIY8xq9QW6B1QGoh3OJ596SnpQ&usqp=CAU",
      name: "38 Barracks",
      cuisines: "North Indian, Italian, Asian",
      average_cost_for_two: 1600,
      aggregate_rating: 4.4,
      adress: "MG Road, Camp, Pune",
      smalladress: "Camp, Pune",
      offer: "₹70 OFF",
      no_of_Delivery: 1230,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "51 min",
    },
    {
      id: "5",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREAW6AHZuQtR_1d9WPZn5mjK_jG-aAJxYfLQ&usqp=CAU",
      name: "Terra Mayaa Restaurant",
      cuisines: "North Indian, Continental, Italian",
      aggregate_rating: 3.5,
      adress: "Baner Road, Baner, Pune",
      smalladress: "Baner, Pune",
      offer: "₹55 OFF",
      no_of_Delivery: 500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "42 min",
    },
    {
      id: "6",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvPe-0FZVXXBJkBWf--jnjCcKN6PxD1Zgdw&usqp=CAU",
      name: "Mocha Hotel",
      cuisines: "Cafe, Italian",
      aggregate_rating: 4.2,
      adress: "ITI Road, Aundh, Pune",
      smalladress: "Aundh, Pune",
      offer: "₹90 OFF",
      no_of_Delivery: 1100,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "34 min",
    },
    {
      id: "7",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVnb3JlCmtRJUTXo3Tj3dl_ZPjq2ScYFE6g&usqp=CAU",
      name: "4 Seasons",
      cuisines: "Chinese, North Indian",
      aggregate_rating: 4.5,
      adress: "Kothrud, Pune",
      smalladress: "Kothrud, Pune",
      offer: "₹55 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "30 min",
    },
    {
      id: "8",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsboAN558yvuCNpy0Lm40ZMT7iYZRkfbL6xA&usqp=CAU",
      name: "Shanghai Salsa",
      cuisines: "Continental, Fast Food, Chinese",
      aggregate_rating: 4.1,
      adress: "Magarpatta City, Hadapsar, Pune",
      smalladress: "Magarpatta, Pune",
      offer: "₹75 OFF",
      no_of_Delivery: 1500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "45 min",
    },
    {
      id: "9",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30R3IntPKgz0A7WzeylvnDyM8EwmAfE2qXA&usqp=CAU",
      name: "Underdoggs Sports Bar & Grill",
      cuisines: "North Indian, Continental",
      aggregate_rating: 3.9,
      adress: "Hinjewadi Phase 1, Pune",
      smalladress: "Hinjewadi, Pune",
      offer: "₹70 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "33 min",
    },
    {
      id: "10",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdGrJhslCsWFMNhndCotN4HNucd_pm9nQSA&usqp=CAU",
      name: "Fat Belly",
      cuisines: "Asian, Chinese, Tibetan",
      aggregate_rating: 4.5,
      adress: "Wakad, Pune",
      smalladress: "Wakad, Pune",
      offer: "₹60 OFF",
      no_of_Delivery: 900,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "53 min",
    },
    {
      id: "11",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEO2PLGXFMmFjaR1Kj19mndyPl-Wh4Kbq0Hw&usqp=CAU",
      name: "Makhan Fish and Chicken Corner",
      cuisines: "Asian, Chinese",
      aggregate_rating: 4.5,
      adress: "Pimple Saudagar, Pune",
      smalladress: "Pimple Saudagar, Pune",
      offer: "₹55 OFF",
      no_of_Delivery: 1200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "43 min",
    },
    {
      id: "12",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzUsgy4YrizXUafeKLzAWasb93wvT_TSIvgw&usqp=CAU",
      name: "Bharawan Da Dhaba",
      cuisines: "North Indian, Fast Food",
      aggregate_rating: 3.6,
      adress: "Shivajinagar, Pune",
      smalladress: "Shivajinagar, Pune",
      offer: "₹70 OFF",
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "28 min",
    },
    {
      id: "13",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXsKQIgGajlkt7qydP7TS6xpVD_gKY6ufnw&usqp=CAU",
      name: "The Kulcha Land",
      cuisines: "North Indian,Asian",
      aggregate_rating: 4.3,
      adress: "Deccan Gymkhana, Pune",
      smalladress: "Deccan Gymkhana, Pune",
      offer: "₹80 OFF",
      no_of_Delivery: 2600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "32 min",
    },
    {
      id: "14",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0iR3PZXGiNSyJf8XCMHuF13y9KL2owcNYQ&usqp=CAU",
      name: "Brothers Dhaba",
      cuisines: "North Indian",
      aggregate_rating: 4.6,
      adress: "Swargate, Pune",
      smalladress: "Swargate, Pune",
      offer: "₹65 OFF",
      no_of_Delivery: 1300,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "42 min",
    },
    {
      id: "15",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHbn8yLak8QNu-M5P4ttVPHFkvKwz4G48x7w&usqp=CAU",
      name: "Charming Chicken",
      cuisines: "North Indian",
      aggregate_rating: 4.6,
      adress: "Hadapsar, Pune",
      smalladress: "Hadapsar, Pune",
      offer: "₹45 OFF",
      no_of_Delivery: 700,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "28 min",
    },
    {
      id: "16",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsQSJX9mRckG3R7NfvYCRe-08s-z22tX-6nQ&usqp=CAU",
      name: "Beera Chicken Corner",
      cuisines: "North Indian",
      aggregate_rating: 4.4,
      adress: "Kondhwa, Pune",
      smalladress: "Kondhwa, Pune",
      offer: "₹80 OFF",
      no_of_Delivery: 1400,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "34 min",
    },
    {
      id: "17",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOJlhGwhda4tsD8Rgk1A97akTRV8QJJC4DA&usqp=CAU",
      name: "Brothers' Amritsari Dhaba",
      cuisines: "North Indian",
      aggregate_rating: 4.2,
      adress: "Katraj, Pune",
      smalladress: "Katraj, Pune",
      offer: "₹40 OFF",
      no_of_Delivery: 1600,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "40 min",
    },
    {
      id: "18",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGqVUxo6HO-CtXn-AHgAin1tvN4l8_A0e1Q&usqp=CAU",
      name: "La Roma Pizzeria",
      cuisines: "Fast Food, Italian",
      aggregate_rating: 4.6,
      adress: "Bavdhan, Pune",
      smalladress: "Bavdhan, Pune",
      offer: "₹40 OFF",
      no_of_Delivery: 2200,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "46 min",
    },
    {
      id: "19",
      featured_image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpI5t_Hgch4-I9edPRV4YNeZKgMX1iHtQng&usqp=CAU",
      name: "Crystal Restaurant",
      cuisines: "North Indian, Mughlai",
      aggregate_rating: 3.5,
      adress: "Pashan, Pune",
      smalladress: "Pashan, Pune",
      offer: "₹80 OFF",
      no_of_Delivery: 2500,
      latitude: 12.9716,
      longitude: 77.5946,
      time: "22 min",
    },
  ];

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enable = await Location.hasServicesEnabledAsync();
    if (!enable) {
      Alert.alert(
        "Location is disabled",
        "Please enable your location to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  const GetCurrentLocation = async () => {
    setCurrentAddress("Pune, Maharashtra, India");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0A0A0F' }}>
      <ScrollView style={{ flex: 1 }}>
        <LocationBar currentAddress={currentAddress} onRefresh={GetCurrentLocation} />
        <Search />
        <Crousel />
        <RestaurantTagline />
        <View style={{ marginHorizontal: 8, paddingBottom: 100 }}>
          {hotels?.map((item, index) => (
            <Hotel key={index} item={item} />
          ))}
        </View>
      </ScrollView>
      <CartFloatingButton cart={cart} />
    </SafeAreaView>
  );
}