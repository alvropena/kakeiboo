import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useThemeColor } from "../constants/theme";
import ContinueButton from "../components/continue-button";
import MyText from "../components/my-text";

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
    inputGroup: {
      marginBottom: 24,
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
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: useThemeColor(scheme, "borderColor"),
    },
    passwordInput: {
      flex: 1,
      fontSize: 20,
      color: useThemeColor(scheme, "text"),
      paddingVertical: 8,
    },
    togglePassword: {
      padding: 8,
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    loginPrompt: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
    },
    loginText: {
      color: useThemeColor(scheme, "secondaryText"),
      fontSize: 16,
    },
    loginLink: {
      color: useThemeColor(scheme, "primary"),
      fontSize: 16,
      marginLeft: 4,
    },
  });

export default function SignUpScreen() {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const activeStyles = styles(scheme);

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  };

  const isValid = () => {
    return isValidEmail(email) && isValidPassword(password);
  };

  return (
    <SafeAreaView style={activeStyles.container}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={activeStyles.container}
      >
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
          <MyText style={activeStyles.headerTitle}>Create Account</MyText>
        </View>

        <View style={activeStyles.content}>
          <View style={activeStyles.inputGroup}>
            <MyText style={activeStyles.label}>EMAIL</MyText>
            <TextInput
              style={activeStyles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={useThemeColor(scheme, "secondaryText")}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              autoCorrect={false}
            />
          </View>

          <View style={activeStyles.inputGroup}>
            <MyText style={activeStyles.label}>PASSWORD</MyText>
            <View style={activeStyles.passwordContainer}>
              <TextInput
                style={activeStyles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={useThemeColor(scheme, "secondaryText")}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <TouchableOpacity
                style={activeStyles.togglePassword}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={useThemeColor(scheme, "secondaryText")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={activeStyles.bottomContainer}>
          <ContinueButton
            onPress={() => {
              if (isValid()) {
                // Handle sign up logic here
                router.push("/gender");
              }
            }}
            disabled={!isValid()}
            text="Sign Up"
          />
          
          <View style={activeStyles.loginPrompt}>
            <MyText style={activeStyles.loginText}>
              Already have an account?
            </MyText>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <MyText style={activeStyles.loginLink}>Log In</MyText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 