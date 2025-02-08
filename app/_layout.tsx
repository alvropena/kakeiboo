import React from "react";
import { router, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TransactionProvider } from "../context/transaction";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "@/provider/auth";
import { useContext } from "react";
import { AuthContext } from "@/provider/auth";

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const auth = useContext(AuthContext);
  const user = auth.user;

  console.log('📱 RootLayoutNav:', {
    user,
    authContext: auth
  });

  useEffect(() => {
    console.log('🔀 Navigation Effect:', {
      user,
      isRedirecting: user === false ? 'to login' : user === true ? 'to home' : 'waiting'
    });

    if (user === false) {
      router.replace("/login");
    } else if (user === true) {
      router.replace("/");
    }
  }, [user]);

  // Show nothing while checking authentication state
  if (user === null) {
    console.log('⏳ Loading state - user is null');
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
      }}
    >
      <Stack.Screen name="(main)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <TransactionProvider>
        <RootLayoutNav />
      </TransactionProvider>
    </AuthProvider>
  );
}
