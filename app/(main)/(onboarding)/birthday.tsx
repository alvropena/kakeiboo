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
import { router, useLocalSearchParams } from "expo-router";
import { useThemeColor } from "@/constants/theme";
import ContinueButton from "@/components/continue-button";
import MyText from "@/components/my-text";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from "react-native";

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
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    label: {
      fontSize: 16,
      color: useThemeColor(scheme, "secondaryText"),
      marginBottom: 8,
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 2,
      borderBottomColor: useThemeColor(scheme, "borderColor"),
    },
    dateText: {
      fontSize: 20,
      color: useThemeColor(scheme, "text"),
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    pickerContainer: {
      backgroundColor: useThemeColor(scheme, "background"),
    },
  });

export default function BirthdayScreen() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const params = useLocalSearchParams();

  const activeStyles = styles(scheme);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    setDate(currentDate);
  };

  const isValidAge = () => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      return age - 1 >= 13;
    }
    return age >= 13;
  };

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
          <MyText style={activeStyles.headerTitle}>When's your birthday?</MyText>
        </View>

        <View style={activeStyles.content}>
          <MyText style={activeStyles.label}>DATE OF BIRTH</MyText>
          
          {Platform.OS === 'android' && (
            <TouchableOpacity 
              onPress={() => setShowPicker(true)}
              style={activeStyles.dateContainer}
            >
              <MyText style={activeStyles.dateText}>
                {formatDate(date)}
              </MyText>
            </TouchableOpacity>
          )}

          {(showPicker || Platform.OS === 'ios') && (
            <View style={activeStyles.pickerContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                textColor={useThemeColor(scheme, "text")}
              />
            </View>
          )}
        </View>

        <View style={activeStyles.bottomContainer}>
          <ContinueButton
            onPress={() => {
              if (isValidAge()) {
                router.push({
                  pathname: "/gender",
                  params: { 
                    name: params.name,
                    birthday: date.toISOString() 
                  },
                });
              }
            }}
            disabled={!isValidAge()}
            text="Continue"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
