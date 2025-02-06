import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "../components/header";
import { useThemeColor } from "../constants/theme";
import ContinueButton from "../components/continue-button";
import MyText from "../components/my-text";

const styles = (scheme: "light" | "dark") =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: useThemeColor(scheme, "background"),
    },
    container: {
      flex: 1,
      backgroundColor: useThemeColor(scheme, "background"),
    },
    mainContent: {
      flex: 1,
      justifyContent: "flex-end",
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    display: {
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 40,
      paddingHorizontal: 20,
      flex: 1,
      width: "100%",
      backgroundColor: useThemeColor(scheme, "borderColor"),
    },
    displayText: {
      fontSize: 72,
      fontWeight: "700",
      color: useThemeColor(scheme, "text"),
    },
    keypad: {
      paddingHorizontal: 24,
      paddingBottom: 32,
      justifyContent: "flex-end",
      backgroundColor: useThemeColor(scheme, "background"),
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      marginBottom: 16,
    },
    button: {
      width: 90,
      height: 90,
      borderRadius: 45,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 35,
    },
    deleteButton: {
      backgroundColor: useThemeColor(scheme, "negativeAmount"),
    },
  });

export default function Index() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const [isPositive, setIsPositive] = useState(false);
  const [displayValue, setDisplayValue] = useState("-$0.00");
  const [fontSize, setFontSize] = useState(84);

  const handleNumberPress = (num: string) => {
    setDisplayValue((prev) => {
      const cleanPrev = prev.replace(/[-+$,]/g, "");
      if (num === "." && cleanPrev.includes(".")) return prev;
      if (num === ".") return `${isPositive ? "+" : "-"}$${cleanPrev}${num}`;
      const numericPart = cleanPrev.replace(".", "").replace(/^0+/, "") + num;
      const dollars = (Number(numericPart) / 100).toFixed(2);
      return `${isPositive ? "+" : "-"}$${Number(dollars).toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}`;
    });
  };

  const handleDelete = () => {
    setDisplayValue((prev) => {
      // Remove formatting and get raw numeric value
      let cleanPrev = prev.replace(/[-+$,]/g, "").replace(".", "");

      // Remove the last digit
      cleanPrev = cleanPrev.slice(0, -1);

      // If empty or zero, reset to default
      if (!cleanPrev || cleanPrev === "0") {
        return `${isPositive ? "+" : "-"}$0.00`;
      }

      // Convert back to currency format properly
      const dollars = (Number(cleanPrev) / 100).toFixed(2);

      return `${isPositive ? "+" : "-"}$${Number(dollars).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`;
    });
  };

  const toggleSign = () => {
    setIsPositive(!isPositive);
    setDisplayValue((prev) => {
      const cleanValue = prev.replace(/[-+]/, "");
      return `${!isPositive ? "+" : "-"}${cleanValue}`;
    });
  };

  const renderButton = (num: string) => (
    <TouchableOpacity
      style={[
        styles(scheme).button,
        { backgroundColor: useThemeColor(scheme, "buttonBackground") },
      ]}
      onPress={() => handleNumberPress(num)}
    >
      <MyText
        style={[
          styles(scheme).buttonText,
          { color: useThemeColor(scheme, "buttonText") },
        ]}
      >
        {num}
      </MyText>
    </TouchableOpacity>
  );

  const activeStyles = styles(scheme);

  return (
    <SafeAreaView style={activeStyles.safeArea}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={activeStyles.container}>
        <Header
          onIconPress={() => router.push("/transactions")}
          iconName="time-outline"
        />
        <View style={activeStyles.mainContent}>
          <View
            style={[
              activeStyles.display,
              { backgroundColor: useThemeColor(scheme, "background") },
            ]}
          >
            <MyText
              style={[
                activeStyles.displayText,
                { color: useThemeColor(scheme, "text") },
                {
                  color: isPositive
                    ? useThemeColor(scheme, "positiveAmount")
                    : useThemeColor(scheme, "negativeAmount"),
                },
                { fontSize: fontSize },
              ]}
            >
              {displayValue}
            </MyText>
          </View>
          <View
            style={[
              activeStyles.keypad,
              { backgroundColor: useThemeColor(scheme, "background") },
            ]}
          >
            <View style={activeStyles.row}>
              {renderButton("7")}
              {renderButton("8")}
              {renderButton("9")}
            </View>
            <View style={activeStyles.row}>
              {renderButton("4")}
              {renderButton("5")}
              {renderButton("6")}
            </View>
            <View style={activeStyles.row}>
              {renderButton("1")}
              {renderButton("2")}
              {renderButton("3")}
            </View>
            <View style={activeStyles.row}>
              <TouchableOpacity
                style={[
                  activeStyles.button,
                  {
                    backgroundColor: useThemeColor(scheme, "buttonBackground"),
                  },
                ]}
                onPress={toggleSign}
              >
                <MyText
                  style={{
                    fontSize: 35,
                    color: isPositive
                      ? useThemeColor(scheme, "negativeAmount")
                      : useThemeColor(scheme, "positiveAmount"),
                  }}
                >
                  {isPositive ? "-" : "+"}
                </MyText>
              </TouchableOpacity>
              {renderButton("0")}
              <TouchableOpacity
                style={[activeStyles.button, activeStyles.deleteButton]}
                onPress={handleDelete}
              >
                <Ionicons name="arrow-back" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={activeStyles.bottomContainer}>
          <ContinueButton
            onPress={() => {
              if (displayValue !== (isPositive ? "+$0.00" : "-$0.00")) {
                router.push({
                  pathname: "/description",
                  params: { amount: displayValue },
                });
              }
            }}
            disabled={displayValue === (isPositive ? "+$0.00" : "-$0.00")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
