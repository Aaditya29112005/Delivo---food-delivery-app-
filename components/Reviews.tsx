import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            user: "Aarav Sharma",
            rating: 4.5,
            date: "2 days ago",
            text: "Great food and ambiance! The butter chicken was delicious.",
            avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        {
            id: 2,
            user: "Sneha Gupta",
            rating: 5,
            date: "1 week ago",
            text: "Best place for family dinner. Highly recommended!",
            avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
        {
            id: 3,
            user: "Rohan Mehta",
            rating: 3.5,
            date: "2 weeks ago",
            text: "Service was a bit slow, but the food made up for it.",
            avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reviews</Text>
            {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                    <View style={styles.header}>
                        <Image source={{ uri: review.avatar }} style={styles.avatar} />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{review.user}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>{review.rating}</Text>
                                <FontAwesome name="star" size={12} color="white" />
                            </View>
                        </View>
                        <Text style={styles.date}>{review.date}</Text>
                    </View>
                    <Text style={styles.reviewText}>{review.text}</Text>
                </View>
            ))}
        </View>
    );
};

export default Reviews;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#1e1e2e",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginBottom: 15,
    },
    reviewCard: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.1)",
        paddingBottom: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#26a541",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: "flex-start",
        marginTop: 4,
    },
    ratingText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 4,
    },
    date: {
        fontSize: 12,
        color: "#aaa",
    },
    reviewText: {
        fontSize: 14,
        color: "#ccc",
        lineHeight: 20,
    },
});
