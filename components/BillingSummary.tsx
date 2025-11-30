import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, GLASS_STYLES } from '@/constants/theme';

interface BillingSummaryProps {
  total: number;
}

const BillingSummary: React.FC<BillingSummaryProps> = ({ total }) => {
  const deliveryFee = 15;
  const partnerFee = 5;
  const finalTotal = total + deliveryFee + partnerFee;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Bill Summary</Text>

      {/* Billing Rows */}
      <View style={styles.row}>
        <Text style={styles.label}>Item Total</Text>
        <Text style={styles.value}>₹{total.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>₹{deliveryFee.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Partner Fee</Text>
        <Text style={styles.value}>₹{partnerFee.toFixed(2)}</Text>
      </View>

      {/* Divider */}
      <LinearGradient
        colors={['transparent', COLORS.glassBorder, 'transparent'] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.divider}
      />

      {/* Total Row */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>To Pay</Text>
        <Text style={styles.totalValue}>₹{finalTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLASS_STYLES.card,
    margin: SPACING.md,
    padding: SPACING.lg,
  },
  header: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  label: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.regular,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: TYPOGRAPHY.bodySmall,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    marginVertical: SPACING.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  totalLabel: {
    fontSize: TYPOGRAPHY.h4,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: TYPOGRAPHY.h3,
    fontWeight: TYPOGRAPHY.extrabold,
    color: COLORS.primary,
  },
});

export default BillingSummary;
