import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useThemeColor } from "@/constants/theme";
import ContinueButton from "@/components/continue-button";
import MyText from "@/components/my-text";

const styles = (scheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: useThemeColor(scheme, "background"),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: "600",
      color: useThemeColor(scheme, "text"),
    },
    inputContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    label: {
      fontSize: 16,
      color: useThemeColor(scheme, "secondaryText"),
      marginBottom: 8,
    },
    input: {
      fontSize: 20,
      color: useThemeColor(scheme, "text"),
      borderBottomWidth: 2,
      borderBottomColor: useThemeColor(scheme, "borderColor"),
      paddingVertical: 8,
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
  });

export default function NameScreen() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const [name, setName] = useState("");

  const activeStyles = styles(scheme);

  return (
    <SafeAreaView style={activeStyles.container}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      
      <View style={activeStyles.container}>
        <View style={activeStyles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={activeStyles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={useThemeColor(scheme, "text")}
            />
          </TouchableOpacity>
          <MyText style={activeStyles.headerTitle}>What's your name?</MyText>
        </View>

        <View style={activeStyles.inputContainer}>
          <MyText style={activeStyles.label}>DISPLAY NAME</MyText>
          <TextInput
            style={activeStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={useThemeColor(scheme, "secondaryText")}
            autoFocus
            autoCapitalize="words"
          />
        </View>

        <View style={activeStyles.bottomContainer}>
          <ContinueButton
            onPress={() => {
              if (name.trim()) {
                router.push({
                  pathname: "/currency",
                  params: { name: name.trim() },
                });
              }
            }}
            disabled={!name.trim()}
            text="Continue"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
