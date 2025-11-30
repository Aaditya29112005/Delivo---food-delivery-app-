import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AuthService from "@/app/services/AuthService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function signUpNewUser() {
    // Validate inputs
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Missing Information", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters");
      return;
    }

    try {
      const result = await AuthService.register(email.trim(), password.trim(), name.trim());

      if (!result.success) {
        Alert.alert("Registration Failed", result.message);
        return;
      }

      Alert.alert(
        "Success!",
        "Account created successfully. Please login.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login")
          }
        ]
      );
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "An unexpected error occurred");
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
              <MaterialIcons name="arrow-back" size={24} color="#FFB800" onPress={() => router.back()} style={{ position: 'absolute', left: 20, top: 60 }} />
              <Text style={styles.title}>Delivo</Text>
              <Text style={styles.tagline}>Join the Exclusive Club</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="person" size={24} color="#FFB800" style={styles.icon} />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="#FFB800" style={styles.icon} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <AntDesign name="lock" size={24} color="#FFB800" style={styles.icon} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  placeholder="Password (min 6 characters)"
                  placeholderTextColor="#666"
                  secureTextEntry
                />
              </View>

              <Pressable style={styles.button} onPress={signUpNewUser}>
                <LinearGradient
                  colors={["#FFB800", "#FF8C00"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>SIGN UP</Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Pressable onPress={() => router.push("/login")}>
                  <Text style={styles.loginLink}>Login</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default Register;

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
  button: {
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  loginText: {
    color: "#rgba(255,255,255,0.6)",
    fontSize: 14,
  },
  loginLink: {
    color: "#FFB800",
    fontSize: 14,
    fontWeight: "bold",
  },
});