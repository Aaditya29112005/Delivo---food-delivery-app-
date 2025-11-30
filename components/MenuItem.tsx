import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, GLASS_STYLES } from "@/constants/theme";

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    image: string;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [additems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (additems === 0) {
      setAddItems(1);
    }
    dispatch(addToCart({ ...item, quantity: 1 }));
    setSelected(true);
  };

  const handleRemoveFromCart = () => {
    if (additems === 1) {
      dispatch(removeFromCart(item));
      setAddItems(0);
      setSelected(false);
      return;
    }
    setAddItems((prev) => prev - 1);
    dispatch(decrementQuantity(item));
  };

  const handleIncrement = () => {
    setAddItems((prev) => prev + 1);
    dispatch(incrementQuantity(item));
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.card}>
        {/* Item Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {item?.name}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{item?.price}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={COLORS.primary} />
              <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {item?.description}
          </Text>
        </View>

        {/* Image with Add Button */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item?.image }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.5)'] as const}
            style={styles.imageGradient}
          />

          {selected ? (
            <View style={styles.quantityContainer}>
              <Pressable
                onPress={handleRemoveFromCart}
                style={({ pressed }) => [
                  styles.quantityButton,
                  pressed && styles.quantityButtonPressed
                ]}
              >
                <Ionicons name="remove" size={18} color="#FFFFFF" />
              </Pressable>

              <Text style={styles.quantityText}>{additems}</Text>

              <Pressable
                onPress={handleIncrement}
                style={({ pressed }) => [
                  styles.quantityButton,
                  pressed && styles.quantityButtonPressed
                ]}
              >
                <Ionicons name="add" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={handleAddToCart}
              style={({ pressed }) => [
                styles.addButtonContainer,
                pressed && styles.addButtonPressed
              ]}
            >
              <LinearGradient
                colors={['#FFB800', '#FF8C00'] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>ADD</Text>
              </LinearGradient>
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
  },
  card: {
    ...GLASS_STYLES.card,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.md,
  },
  detailsContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  price: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  rating: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.primary,
  },
  description: {
    fontSize: TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.md,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: BORDER_RADIUS.md,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: SPACING.sm,
    left: '50%',
    transform: [{ translateX: -35 }],
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  addButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  addButtonPressed: {
    transform: [{ translateX: -35 }, { scale: 0.95 }],
  },
  addButtonText: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.bold,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  quantityContainer: {
    position: "absolute",
    bottom: SPACING.sm,
    left: '50%',
    transform: [{ translateX: -45 }],
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 4,
    gap: SPACING.sm,
    ...SHADOWS.medium,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonPressed: {
    opacity: 0.7,
  },
  quantityText: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.bold,
    color: '#FFFFFF',
    minWidth: 20,
    textAlign: 'center',
  },
});

export default MenuItem;
