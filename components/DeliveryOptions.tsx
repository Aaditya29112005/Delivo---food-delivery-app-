import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

interface DeliveryOptionsProps {
    selectedOption: "standard" | "premium";
    onSelect: (option: "standard" | "premium") => void;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({ selectedOption, onSelect }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Delivery Options</Text>

            {/* Standard Option */}
            <Pressable
                onPress={() => onSelect("standard")}
                style={[
                    styles.card,
                    selectedOption === "standard" && styles.selectedCard,
                ]}
            >
                <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="delivery-dining" size={24} color={selectedOption === "standard" ? "#fd5c63" : "#888"} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.optionTitle, selectedOption === "standard" && styles.selectedText]}>Delivo</Text>
                        <Text style={styles.optionSubtitle}>Standard Delivery</Text>
                        <View style={styles.metaContainer}>
                            <Text style={styles.etaText}>30-45 mins</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.trackingText}>Basic tracking</Text>
                        </View>
                    </View>
                    <Text style={[styles.priceText, selectedOption === "standard" && styles.selectedText]}>₹29</Text>
                </View>
            </Pressable>

            {/* Premium Option */}
            <Pressable
                onPress={() => onSelect("premium")}
                style={[
                    styles.card,
                    selectedOption === "premium" && styles.selectedCardPremium,
                ]}
            >
                {selectedOption === "premium" && (
                    <LinearGradient
                        colors={['rgba(253, 92, 99, 0.1)', 'rgba(253, 92, 99, 0.05)']}
                        style={StyleSheet.absoluteFillObject}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                )}
                <View style={styles.cardContent}>
                    <View style={[styles.iconContainer, selectedOption === "premium" && styles.selectedIconContainerPremium]}>
                        <MaterialCommunityIcons name="crown" size={24} color={selectedOption === "premium" ? "#FFD700" : "#888"} />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleRow}>
                            <Text style={[styles.optionTitle, selectedOption === "premium" && styles.selectedTextPremium]}>Delivo Premium</Text>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>FAST</Text>
                            </View>
                        </View>
                        <Text style={styles.optionSubtitle}>Priority Delivery</Text>
                        <View style={styles.metaContainer}>
                            <Text style={[styles.etaText, selectedOption === "premium" && styles.selectedTextPremium]}>10-20 mins</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={[styles.trackingText, selectedOption === "premium" && styles.selectedTextPremium]}>Priority tracking</Text>
                        </View>
                    </View>
                    <Text style={[styles.priceText, selectedOption === "premium" && styles.selectedTextPremium]}>₹59</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default DeliveryOptions;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        marginBottom: 12,
        marginLeft: 5,
    },
    card: {
        backgroundColor: "#2e2e3e",
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: "transparent",
        overflow: 'hidden',
    },
    selectedCard: {
        borderColor: "#fd5c63",
        backgroundColor: "#252535",
    },
    selectedCardPremium: {
        borderColor: "#FFD700", // Gold border for premium
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    selectedIconContainerPremium: {
        backgroundColor: "rgba(255, 215, 0, 0.1)", // Gold tint
    },
    infoContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#ddd",
        marginBottom: 2,
    },
    selectedText: {
        color: "#fd5c63",
    },
    selectedTextPremium: {
        color: "#FFD700", // Gold text
    },
    optionSubtitle: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    etaText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#aaa",
    },
    dot: {
        color: "#666",
        marginHorizontal: 6,
        fontSize: 10,
    },
    trackingText: {
        fontSize: 12,
        color: "#aaa",
    },
    priceText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#ddd",
    },
    badge: {
        backgroundColor: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)", // Fallback color if gradient doesn't work on View
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    badgeText: {
        color: "black",
        fontSize: 10,
        fontWeight: "800",
    }
});
