import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import Header from "../components/header";
import { useTransactions } from "../context/transaction";
import { Transaction } from "@/context/transaction";
import { useThemeColor } from "../constants/theme";
import { useState, useCallback } from "react";
import MyText from "@/components/my-text";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

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
    list: {
      flex: 1,
    },
    transactionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      marginHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: useThemeColor(scheme, "borderColor"),
      backgroundColor: useThemeColor(scheme, "cardBackground"),
    },
    description: {
      fontSize: 17,
      fontWeight: "600",
      color: useThemeColor(scheme, "text"),
      flexWrap: "wrap",
      flex: 1,
      marginRight: 32,
    },
    date: {
      fontSize: 13,
      marginTop: 4,
      color: useThemeColor(scheme, "dateText"),
    },
    time: {
      fontSize: 13,
      color: useThemeColor(scheme, "dateText"),
      textAlign: "right",
    },
    amount: {
      fontSize: 17,
      fontWeight: "600",
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    emptyStateText: {
      fontSize: 17,
      textAlign: "center",
      color: useThemeColor(scheme, "secondaryText"),
    },
  });

export default function Transactions() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const activeStyles = styles(scheme);
  const { transactions, fetchTransactions } = useTransactions();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchTransactions();
    setIsRefreshing(false);
  }, [fetchTransactions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const { deleteTransaction } = useTransactions();

  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      onPress={() => handleDelete(id)}
      style={{
        backgroundColor: useThemeColor(scheme, "negativeAmount"),
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
      }}
    >
      <MyText style={{ color: "white", fontWeight: "bold" }}>Delete</MyText>
    </TouchableOpacity>
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={activeStyles.transactionItem}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <MyText style={activeStyles.description}>{item.description}</MyText>
            <MyText
              style={[
                activeStyles.amount,
                {
                  color:
                    item.amount > 0
                      ? useThemeColor(scheme, "positiveAmount")
                      : useThemeColor(scheme, "negativeAmount"),
                },
              ]}
            >
              {item.amount > 0 ? "+" : "-"}$
              {Math.abs(item.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </MyText>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <MyText style={activeStyles.date}>{formatDate(item.date)}</MyText>
            <MyText style={activeStyles.time}>{formatTime(item.date)}</MyText>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={activeStyles.safeArea}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <View style={activeStyles.container}>
          <Header onIconPress={() => router.back()} iconName="close" />
          {transactions.length > 0 ? (
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id}
              style={activeStyles.list}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                  tintColor={useThemeColor(scheme, "text")}
                />
              }
            />
          ) : (
            <View style={activeStyles.emptyState}>
              <MyText style={activeStyles.emptyStateText}>
                Nothing new here. Add your expenses now!
              </MyText>
            </View>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
