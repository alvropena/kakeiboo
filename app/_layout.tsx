import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TransactionProvider } from "../context/transaction";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <TransactionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="transactions" />
        <Stack.Screen name="description" />
      </Stack>
    </TransactionProvider>
  );
}
