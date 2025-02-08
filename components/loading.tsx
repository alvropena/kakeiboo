import React from "react";
import { View, ActivityIndicator, useColorScheme } from "react-native";
import { useThemeColor } from "../constants/theme";

export default function Loading() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: useThemeColor(scheme, "background")
      }}
    >
      <ActivityIndicator 
        size="large" 
        color={useThemeColor(scheme, "primary")}
      />
    </View>
  );
}
