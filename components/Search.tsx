import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, Keyboard, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, GLASS_STYLES } from '@/constants/theme';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      Alert.alert('Empty Search', 'Please enter a valid search term.');
      return;
    }

    const foodKeywords = [
      'burger', 'chilly chicken', 'smash', 'light burger', 'pasta',
      'regular', 'cheese fries', 'crinkle fries', 'poutine', 'cola',
      'cocacola', 'coca cola', 'fanta', 'drink', 'sprite', 'pepsi',
      'tea', 'drinks', 'fries'
    ];
    const hotelKeywords = ['hotel', 'burger point'];

    if (foodKeywords.some((keyword) => query.includes(keyword))) {
      router.push('/(home)/hotel' as any);
    } else if (hotelKeywords.some((keyword) => query.includes(keyword))) {
      router.push('/' as any);
    } else {
      Alert.alert('No Results', 'No matching section found.');
    }

    Keyboard.dismiss();
  };

  return (
    <View style={[
      styles.container,
      isFocused && styles.containerFocused
    ]}>
      <Ionicons
        name="search"
        size={20}
        color={isFocused ? COLORS.primary : COLORS.textTertiary}
        style={styles.searchIcon}
      />

      <TextInput
        placeholder="Search for food, restaurants..."
        placeholderTextColor={COLORS.textTertiary}
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
      />

      {searchQuery.length > 0 && (
        <Pressable
          onPress={() => setSearchQuery('')}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.clearButtonPressed
          ]}
        >
          <Ionicons name="close-circle" size={20} color={COLORS.textTertiary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GLASS_STYLES.input,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    height: 52,
  },
  containerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.glassHover,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.regular,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  clearButtonPressed: {
    opacity: 0.6,
  },
});
