import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

export default function RestaurantTagline() {
  return (
    <View style={styles.container}>
      {/* Tagline */}
      <Text style={styles.tagline}>
        Feel the taste that you will never forget blended with tenderness
      </Text>

      {/* Divider with gradient */}
      <View style={styles.dividerContainer}>
        <LinearGradient
          colors={['transparent', COLORS.primary, 'transparent'] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.divider}
        />
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>ALL RESTAURANTS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  tagline: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  dividerContainer: {
    marginVertical: SPACING.md,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
    textAlign: 'center',
    letterSpacing: 3,
    marginTop: SPACING.md,
  },
});