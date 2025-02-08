import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function Auth() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
};
