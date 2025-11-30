import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "@/app/services/AuthService";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGuestLoading, setIsGuestLoading] = useState(false);
    const router = useRouter();

    async function signinWithEmail() {
        // Validate input fields
        if (!email.trim() || !password.trim()) {
            alert("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await AuthService.login(email.trim(), password.trim());

            if (!result.success) {
                alert(result.message);
                return;
            }

            router.replace("/home" as any);
        } catch (error) {
            console.error("Error during login:", error);
            alert("An unexpected error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    async function signinAsGuest() {
        setIsGuestLoading(true);
        try {
            await AsyncStorage.setItem("authToken", "guest_token");
            router.replace("/home" as any);
        } catch (error) {
            console.error("Error during guest login:", error);
            alert("An unexpected error occurred. Please try again later.");
        } finally {
            setIsGuestLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={["#0A0A0F", "#1A1A2E", "#0A0A0F"]}
                style={styles.container}
            >
                <SafeAreaView style={styles.safeArea}>
                    <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Delivo</Text>
                            <Text style={styles.tagline}>Premium Food Delivery</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.welcomeText}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to continue your journey</Text>

                            <View style={styles.inputContainer}>
                                <MaterialIcons name="email" size={24} color="#FFB800" style={styles.icon} />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Email"
                                    placeholderTextColor="#666"
                                    style={styles.input}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <AntDesign name="lock" size={24} color="#FFB800" style={styles.icon} />
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Password"
                                    placeholderTextColor="#666"
                                    style={styles.input}
                                    secureTextEntry
                                />
                            </View>

                            <Pressable style={styles.loginButton} onPress={signinWithEmail} disabled={isLoading || isGuestLoading}>
                                <LinearGradient
                                    colors={["#FFB800", "#FF8C00"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientButton}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        <Text style={styles.loginButtonText}>LOGIN</Text>
                                    )}
                                </LinearGradient>
                            </Pressable>

                            <Pressable style={styles.guestButton} onPress={signinAsGuest} disabled={isLoading || isGuestLoading}>
                                {isGuestLoading ? (
                                    <ActivityIndicator size="small" color="#FFB800" />
                                ) : (
                                    <Text style={styles.guestButtonText}>Continue as Guest</Text>
                                )}
                            </Pressable>

                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>New to Delivo? </Text>
                                <Pressable onPress={() => router.push("/register")}>
                                    <Text style={styles.signupLink}>Create Account</Text>
                                </Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
        paddingBottom: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#FFB800",
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 14,
        color: "#rgba(255,255,255,0.6)",
        marginTop: 5,
        letterSpacing: 2,
        textTransform: "uppercase",
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#rgba(255,255,255,0.5)",
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 15,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        height: 60,
    },
    icon: {
        marginRight: 15,
    },
    input: {
        flex: 1,
        color: "white",
        fontSize: 16,
    },
    loginButton: {
        marginTop: 30,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: "#FFB800",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    gradientButton: {
        paddingVertical: 18,
        alignItems: "center",
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    guestButton: {
        backgroundColor: "transparent",
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: "center",
        marginTop: 15,
        borderWidth: 1,
        borderColor: "rgba(255, 184, 0, 0.3)",
    },
    guestButtonText: {
        color: "#FFB800",
        fontSize: 16,
        fontWeight: "600",
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
    },
    signupText: {
        color: "#rgba(255,255,255,0.6)",
        fontSize: 14,
    },
    signupLink: {
        color: "#FFB800",
        fontSize: 14,
        fontWeight: "bold",
    },
});
