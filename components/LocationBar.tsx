import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, GLASS_STYLES } from '@/constants/theme';

interface LocationBarProps {
  currentAddress: string;
  onRefresh?: () => void;
}

const LocationBar: React.FC<LocationBarProps> = ({ currentAddress, onRefresh }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Location Section */}
      <View style={styles.locationSection}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={24} color={COLORS.primary} />
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.label}>Deliver To</Text>
          <Text style={styles.address} numberOfLines={1}>
            {currentAddress}
          </Text>
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.actionsSection}>
        {/* Refresh Button */}
        <Pressable
          onPress={onRefresh}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed
          ]}
        >
          <Ionicons name="refresh" size={20} color={COLORS.textPrimary} />
        </Pressable>

        {/* Profile Button with Gradient */}
        <Pressable
          onPress={() => router.push('/(authenticate)/logout' as any)}
          style={({ pressed }) => [
            styles.profileButtonContainer,
            pressed && styles.profileButtonPressed
          ]}
        >
          <LinearGradient
            colors={['#FFB800', '#FF8C00'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileButton}
          >
            <MaterialCommunityIcons name="account" size={22} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLASS_STYLES.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  locationSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    flex: 1,
  },
  label: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  address: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textPrimary,
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonPressed: {
    backgroundColor: COLORS.glassHover,
    transform: [{ scale: 0.95 }],
  },
  profileButtonContainer: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    ...SHADOWS.glow,
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
});

export default LocationBar;