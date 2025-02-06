import { TouchableOpacity, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { useThemeColor } from "../constants/theme";
import MyText from "./my-text";

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  text?: string;
}

export default function ContinueButton({
  onPress,
  disabled = false,
  text = "Continue",
}: ContinueButtonProps) {
  const colorScheme = useColorScheme();
  const scheme = colorScheme || "light";

  const styles = StyleSheet.create({
    continueButton: {
      backgroundColor: useThemeColor(scheme, "primary"),
      paddingVertical: 22,
      borderRadius: 34,
      width: "100%",
      alignItems: "center",
    },
    continueButtonDisabled: {
      backgroundColor: useThemeColor(scheme, "disabledBackground"),
    },
    continueButtonText: {
      color: "white",
      fontSize: 19,
    },
    continueButtonTextDisabled: {
      color: useThemeColor(scheme, "disabledText"),
    },
  });

  return (
    <TouchableOpacity
      style={[styles.continueButton, disabled && styles.continueButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <MyText
        style={[
          styles.continueButtonText,
          disabled && styles.continueButtonTextDisabled,
        ]}
        weight="600"
      >
        {text}
      </MyText>
    </TouchableOpacity>
  );
}
