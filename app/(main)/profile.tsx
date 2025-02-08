import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MyText from "@/components/my-text";
import { useThemeColor } from "@/constants/theme";
import { useContext } from "react";
import { AuthContext } from "@/provider/auth";

export default function Profile() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const { userProfile } = useContext(AuthContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: useThemeColor(scheme, "background"),
      padding: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: useThemeColor(scheme, "text"),
    },
    closeButton: {
      padding: 8,
    },
    infoContainer: {
      gap: 20,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: useThemeColor(scheme, "borderColor"),
    },
    label: {
      fontSize: 16,
      color: useThemeColor(scheme, "secondaryText"),
    },
    value: {
      fontSize: 16,
      color: useThemeColor(scheme, "text"),
    },
  });

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <MyText>Loading...</MyText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MyText style={styles.title}>Profile</MyText>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons 
            name="close" 
            size={24} 
            color={useThemeColor(scheme, "text")} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MyText style={styles.label}>Name</MyText>
          <MyText style={styles.value}>{userProfile.name}</MyText>
        </View>
        <View style={styles.infoRow}>
          <MyText style={styles.label}>Birthday</MyText>
          <MyText style={styles.value}>{userProfile.birthday}</MyText>
        </View>
        <View style={styles.infoRow}>
          <MyText style={styles.label}>Gender</MyText>
          <MyText style={styles.value}>{userProfile.gender}</MyText>
        </View>
        <View style={styles.infoRow}>
          <MyText style={styles.label}>Currency</MyText>
          <MyText style={styles.value}>{userProfile.currency}</MyText>
        </View>
      </View>
    </View>
  );
} 