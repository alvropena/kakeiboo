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
import { useThemeColor } from "../constants/theme";
import ContinueButton from "../components/continue-button";
import MyText from "../components/my-text";

type Gender = "male" | "female" | "other";

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
    radioGroup: {
      marginTop: 8,
    },
    radioItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: useThemeColor(scheme, "borderColor"),
    },
    radioLabel: {
      flex: 1,
      fontSize: 20,
      color: useThemeColor(scheme, "text"),
    },
    radioButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: useThemeColor(scheme, "primary"),
      alignItems: "center",
      justifyContent: "center",
    },
    radioButtonSelected: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: useThemeColor(scheme, "primary"),
    },
    otherInput: {
      fontSize: 20,
      color: useThemeColor(scheme, "text"),
      borderBottomWidth: 2,
      borderBottomColor: useThemeColor(scheme, "borderColor"),
      paddingVertical: 8,
      marginTop: 16,
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
  });

export default function GenderScreen() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [otherGender, setOtherGender] = useState("");

  const activeStyles = styles(scheme);

  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={activeStyles.radioButton}>
      {selected && <View style={activeStyles.radioButtonSelected} />}
    </View>
  );

  const isValid = () => {
    if (selectedGender === "other") {
      return otherGender.trim().length > 0;
    }
    return selectedGender !== null;
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
          <MyText style={activeStyles.headerTitle}>What's your gender?</MyText>
        </View>

        <View style={activeStyles.content}>
          <MyText style={activeStyles.label}>GENDER</MyText>
          
          <View style={activeStyles.radioGroup}>
            {(["male", "female", "other"] as Gender[]).map((gender) => (
              <TouchableOpacity
                key={gender}
                style={activeStyles.radioItem}
                onPress={() => setSelectedGender(gender)}
              >
                <MyText style={activeStyles.radioLabel}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </MyText>
                <RadioButton selected={selectedGender === gender} />
              </TouchableOpacity>
            ))}
          </View>

          {selectedGender === "other" && (
            <TextInput
              style={activeStyles.otherInput}
              value={otherGender}
              onChangeText={setOtherGender}
              placeholder="Specify your gender"
              placeholderTextColor={useThemeColor(scheme, "secondaryText")}
              autoFocus
            />
          )}
        </View>

        <View style={activeStyles.bottomContainer}>
          <ContinueButton
            onPress={() => {
              if (isValid()) {
                router.push({
                  pathname: "/birthday",
                  params: { 
                    gender: selectedGender === "other" ? otherGender : selectedGender 
                  },
                });
              }
            }}
            disabled={!isValid()}
            text="Continue"
          />
        </View>
      </View>
    </SafeAreaView>
  );
} 