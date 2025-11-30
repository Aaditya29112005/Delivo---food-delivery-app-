import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/supabase";

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        const token = await AsyncStorage.getItem("authToken");
        if (token === "guest_token") {
            setIsGuest(true);
            setUser({ name: "Guest User", email: "guest@delivo.com" });
        } else {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
    };

    const menuItems = [
        { icon: "receipt-long", label: "Your Orders", type: "material" },
        { icon: "favorite-border", label: "Favorite Restaurants", type: "material" },
        { icon: "book-outline", label: "Address Book", type: "ionic" },
        { icon: "payment", label: "Money & Payments", type: "material" },
        { icon: "settings-outline", label: "Settings", type: "ionic" },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.name || user?.user_metadata?.name || "Foodie"}</Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                        <Pressable style={styles.viewActivity}>
                            <Text style={styles.activityText}>View Activity</Text>
                            <MaterialIcons name="arrow-right" size={20} color="#fd5c63" />
                        </Pressable>
                    </View>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                        style={styles.avatar}
                    />
                </View>

                {/* Menu Options */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <Pressable key={index} style={styles.menuItem}>
                            <View style={styles.menuIconContainer}>
                                {item.type === "material" ? (
                                    <MaterialIcons name={item.icon as any} size={24} color="white" />
                                ) : (
                                    <Ionicons name={item.icon as any} size={24} color="white" />
                                )}
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <MaterialIcons name="chevron-right" size={24} color="#777" />
                        </Pressable>
                    ))}

                    {/* Logout */}
                    <Pressable onPress={() => router.push('/logout' as any)} style={styles.menuItem}>
                        <View style={[styles.menuIconContainer, { backgroundColor: "rgba(253, 92, 99, 0.1)" }]}>
                            <MaterialIcons name="logout" size={24} color="#fd5c63" />
                        </View>
                        <Text style={[styles.menuLabel, { color: "#fd5c63" }]}>Logout</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A0F",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        marginBottom: 20,
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: "#aaa",
        marginBottom: 10,
    },
    viewActivity: {
        flexDirection: "row",
        alignItems: "center",
    },
    activityText: {
        color: "#fd5c63",
        fontWeight: "600",
        fontSize: 14,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#fd5c63",
    },
    menuContainer: {
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        color: "white",
        fontWeight: "500",
    },
});
