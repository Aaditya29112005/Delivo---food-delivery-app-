import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Dining = () => {
    return (
        <View style={styles.container}>
            {/* Book Table Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Book a Table</Text>
                <Pressable style={styles.bookButton} onPress={() => alert("Booking feature coming soon!")}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </Pressable>
            </View>

            {/* Menu Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Full Menu</Text>
                <View style={styles.menuImages}>
                    <Image
                        source={{ uri: "https://b.zmtcdn.com/data/menus/288/18854288/1f8008fc1cec3cd7ea2b559c32b1e642.jpg" }}
                        style={styles.menuImage}
                    />
                    <Image
                        source={{ uri: "https://b.zmtcdn.com/data/menus/288/18854288/68d04135bbac1e3d5ff5a87d45974da1.jpg" }}
                        style={styles.menuImage}
                    />
                </View>
                <Pressable style={styles.viewMenuButton}>
                    <Text style={styles.viewMenuText}>View Full Menu</Text>
                    <MaterialIcons name="arrow-right" size={20} color="#fd5c63" />
                </Pressable>
            </View>
        </View>
    );
};

export default Dining;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#1e1e2e",
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 15,
    },
    bookButton: {
        backgroundColor: "#fd5c63",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    bookButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    menuImages: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15,
    },
    menuImage: {
        width: 100,
        height: 140,
        borderRadius: 8,
    },
    viewMenuButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#fd5c63",
        paddingVertical: 10,
        borderRadius: 8,
    },
    viewMenuText: {
        color: "#fd5c63",
        fontWeight: "600",
    }
});
