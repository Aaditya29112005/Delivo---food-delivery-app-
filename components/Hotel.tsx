import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, GLASS_STYLES } from '@/constants/theme';

interface Img {
  id: string;
  image: string;
  description: string;
}

interface hotel {
  id: string;
  featured_image: string;
  images?: Img[];
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

interface HotelProps {
  item: hotel;
}

const Hotel = ({ item }: HotelProps) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/hotel' as any,
          params: {
            id: item.id,
            name: item.name,
            address: item.adress,
            smalladress: item.smalladress,
            cuisines: item.cuisines,
            aggregate_rating: item.aggregate_rating,
          },
        })
      }
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed
      ]}
    >
      {/* Image with Gradient Overlay */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: item?.featured_image }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
          style={styles.imageGradient}
        />

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#FFFFFF" />
          <Text style={styles.ratingText}>{item?.aggregate_rating}</Text>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name} numberOfLines={1}>{item?.name}</Text>
        <Text style={styles.cuisines} numberOfLines={1}>{item?.cuisines}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={14} color={COLORS.textTertiary} />
            <Text style={styles.infoText}>{item?.time}</Text>
          </View>

          {item?.no_of_Delivery && (
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="bike-fast" size={14} color={COLORS.textTertiary} />
              <Text style={styles.infoText}>{item.no_of_Delivery}+ orders</Text>
            </View>
          )}
        </View>
      </View>

      {/* Offer Banner */}
      {item?.offer && (
        <View style={styles.offerBanner}>
          <LinearGradient
            colors={['rgba(255, 184, 0, 0.15)', 'rgba(255, 140, 0, 0.15)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.offerGradient}
          >
            <MaterialCommunityIcons name="brightness-percent" size={18} color={COLORS.primary} />
            <Text style={styles.offerText}>{item.offer}</Text>
          </LinearGradient>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLASS_STYLES.card,
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.md,
    overflow: 'hidden',
  },
  containerPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  ratingBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 4,
    ...SHADOWS.medium,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: TYPOGRAPHY.bold,
    fontSize: TYPOGRAPHY.caption,
  },
  detailsContainer: {
    padding: SPACING.lg,
  },
  name: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  cuisines: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textTertiary,
  },
  offerBanner: {
    overflow: 'hidden',
  },
  offerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  offerText: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
});

export default Hotel;
