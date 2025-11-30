import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { RootState } from "../store";
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "@/constants/theme";

const CartFloatingButton = ({ cart }: { cart: RootState["cart"]["cart"] }) => {
  const router = useRouter();

  if (cart?.length === 0) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/cart" as any,
            params: { name: "Your Cart" },
          })
        }
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && styles.buttonPressed
        ]}
      >
        <LinearGradient
          colors={['#FFB800', '#FF8C00'] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          {/* Cart Icon with Badge */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="cart" size={24} color="#FFFFFF" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>View Cart</Text>
            <Text style={styles.subtitle}>{cart.length} item{cart.length > 1 ? 's' : ''} added</Text>
          </View>

          {/* Arrow Icon */}
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: SPACING.xl,
    left: SPACING.md,
    right: SPACING.md,
    zIndex: 100,
  },
  buttonContainer: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.glow,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.round,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.tiny,
    fontWeight: TYPOGRAPHY.bold,
  },
  textContainer: {
    flex: 1,
    marginLeft: SPACING.lg,
  },
  title: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.bold,
    marginBottom: 2,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.medium,
  },
});

export default CartFloatingButton;
