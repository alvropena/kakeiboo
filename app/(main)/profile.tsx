import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MyText from "@/components/my-text";
import { useThemeColor } from "@/constants/theme";
import { useContext } from "react";
import { AuthContext } from "@/provider/auth";
import Header from "@/components/header";
import ContinueButton from "@/components/continue-button";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const { userProfile } = useContext(AuthContext);

  // Add formatting helpers
  const formatBirthday = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: useThemeColor(scheme, "background"),
    },
    container: {
      flex: 1,
      backgroundColor: useThemeColor(scheme, "background"),
    },
    content: {
      flex: 1,
      padding: 20,
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
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    developedBy: {
      fontSize: 12,
      textAlign: 'center',
      color: useThemeColor(scheme, "secondaryText"),
      marginTop: 12,
    },
  });

  if (!userProfile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <MyText>Loading...</MyText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={styles.container}>
        <Header 
          title="Profile" 
          rightIcons={[
            {
              name: "close",
              onPress: () => router.back(),
            },
          ]}
        />
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <MyText style={styles.label}>Name</MyText>
              <MyText style={styles.value}>{userProfile.name}</MyText>
            </View>
            <View style={styles.infoRow}>
              <MyText style={styles.label}>Birthday</MyText>
              <MyText style={styles.value}>{formatBirthday(userProfile.birthday)}</MyText>
            </View>
            <View style={styles.infoRow}>
              <MyText style={styles.label}>Gender</MyText>
              <MyText style={styles.value}>{formatGender(userProfile.gender)}</MyText>
            </View>
            <View style={styles.infoRow}>
              <MyText style={styles.label}>Currency</MyText>
              <MyText style={styles.value}>{userProfile.currency}</MyText>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <ContinueButton
            text="Sign Out"
            onPress={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.error('Error signing out:', error);
              }
            }}
            customStyle={{
              backgroundColor: useThemeColor(scheme, "negativeAmount")
            }}
          />
           <MyText style={styles.developedBy}>Developed by <MyText style={{fontWeight: '700', fontSize: 12}}>Optiffy</MyText></MyText>
        </View>
      </View>
    </SafeAreaView>
  );
}