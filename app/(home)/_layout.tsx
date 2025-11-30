import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="hotel" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="order" />
    </Stack>
  )
}
