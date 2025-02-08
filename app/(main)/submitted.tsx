import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ContinueButton from "@/components/continue-button";
import { useThemeColor } from "@/constants/theme";
import MyText from "@/components/my-text";

const styles = (scheme: "light" | "dark") =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: useThemeColor(scheme, "background"),
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    topSection: {
      alignItems: "center",
      gap: 16,
      marginTop: 48,
      marginBottom: 48,
    },
    iconCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "600",
      textAlign: "center",
      color: useThemeColor(scheme, "text"),
    },
    subtitle: {
      fontSize: 17,
      textAlign: "center",
      color: useThemeColor(scheme, "secondaryText"),
    },
    detailsContainer: {
      alignItems: "center",
      gap: 16,
    },
    amount: {
      fontSize: 48,
      fontWeight: "700",
    },
    description: {
      fontSize: 24,
      fontWeight: "500",
      color: useThemeColor(scheme, "text"),
      textAlign: "center",
      paddingHorizontal: 20,
    },
    dateContainer: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    date: {
      fontSize: 15,
      color: useThemeColor(scheme, "secondaryText"),
    },
    time: {
      fontSize: 15,
      color: useThemeColor(scheme, "secondaryText"),
    },
    bottomContainer: {
      position: "absolute",
      bottom: 34,
      left: 20,
      right: 20,
    },
  });

export default function Submitted() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const activeStyles = styles(scheme);
  const { amount, description } = useLocalSearchParams();

  const isExpense = amount?.toString().startsWith("-");

  const formatDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };
  };

  const { date, time } = formatDateTime();

  return (
    <SafeAreaView style={activeStyles.safeArea}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={activeStyles.container}>
        <View style={activeStyles.topSection}>
          <View
            style={[
              activeStyles.iconCircle,
              {
                backgroundColor: isExpense
                  ? useThemeColor(scheme, "negativeAmount")
                  : useThemeColor(scheme, "positiveAmount"),
                borderWidth: 3,
                borderColor: scheme === "dark" ? "white" : "black",
              },
            ]}
          >
            <Ionicons
              name={isExpense ? "trending-down" : "trending-up"}
              size={72}
              color={scheme === "dark" ? "white" : "black"}
            />
          </View>
          <MyText style={activeStyles.title}>
            {isExpense ? "Expense" : "Income"} registered
          </MyText>

          <MyText style={activeStyles.subtitle}>
            {isExpense
              ? "Your expense has been added to your spending history"
              : "Your income has been added to your earnings history"}
          </MyText>
        </View>

        <View style={activeStyles.detailsContainer}>
          <MyText
            style={[
              activeStyles.amount,
              {
                color: isExpense
                  ? useThemeColor(scheme, "negativeAmount")
                  : useThemeColor(scheme, "positiveAmount"),
              },
            ]}
          >
            {amount}
          </MyText>

          <MyText style={activeStyles.description}>{description}</MyText>

          <View style={activeStyles.dateContainer}>
            <MyText style={activeStyles.date}>{date}</MyText>
            <MyText style={activeStyles.time}>{time}</MyText>
          </View>
        </View>

        <View style={activeStyles.bottomContainer}>
          <ContinueButton onPress={() => router.replace("/")} text="Done" />
        </View>
      </View>
    </SafeAreaView>
  );
}
