import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Header from "../components/header";
import ContinueButton from "../components/continue-button";
import { useTransactions } from "../context/transaction";
import { useThemeColor } from "../constants/theme";
import MyText from "../components/my-text";
export default function Description() {
  const { amount } = useLocalSearchParams();
  const MAX_CHARS = 60;
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const activeStyles = styles(scheme);
  const [description, setDescription] = useState("");
  const [inputRef, setInputRef] = useState<TextInput | null>(null);
  const { addTransaction } = useTransactions();

  const remainingChars = MAX_CHARS - description.length;

  const handleDescriptionChange = (text: string) => {
    if (text.length <= MAX_CHARS) {
      setDescription(text);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef?.focus();
    }, 100);
  }, [inputRef]);

  const handleSubmit = () => {
    const parsedAmount = parseFloat(
      (amount as string).replace(/[^0-9.-]+/g, "")
    );
    addTransaction(description, parsedAmount);
    router.push({
      pathname: "/submitted",
      params: {
        amount: amount,
        description: description,
      },
    });
  };

  return (
    <SafeAreaView style={activeStyles.safeArea}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={activeStyles.container}
      >
        <Header onIconPress={() => router.back()} iconName="close-outline" />

        <View style={activeStyles.mainContent}>
          <TextInput
            ref={(ref) => setInputRef(ref)}
            style={[activeStyles.input, { fontFamily: "Inter_400Regular" }]}
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Enter description"
            placeholderTextColor={useThemeColor(scheme, "secondaryText")}
            autoFocus={true}
            maxLength={MAX_CHARS}
            multiline={true}
            blurOnSubmit={false}
            returnKeyType="default"
          />

          <MyText style={activeStyles.charCounter}>{remainingChars}</MyText>
        </View>

        <View style={activeStyles.bottomContainer}>
          <ContinueButton
            onPress={handleSubmit}
            disabled={!description || !amount}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = (scheme: "light" | "dark") =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: useThemeColor(scheme, "background"),
    },
    container: {
      flex: 1,
    },
    mainContent: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    input: {
      fontSize: 34,
      fontWeight: "400",
      minHeight: 40,
      textAlignVertical: "top",
      paddingTop: 0,
      color: useThemeColor(scheme, "text"),
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    charCounter: {
      fontSize: 15,
      textAlign: "right",
      marginTop: 8,
      marginBottom: 16,
      color: useThemeColor(scheme, "secondaryText"),
    },
  });
