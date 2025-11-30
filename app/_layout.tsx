import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../store';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(authenticate)" />
                <Stack.Screen name="(home)" />
                <Stack.Screen name="driver" />
            </Stack>
        </Provider>
    );
}
