import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useThemeColor } from "../constants/theme";
import MyText from "./my-text";

type HeaderProps = {
  onIconPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
};

export default function Header({ onIconPress, iconName }: HeaderProps) {
  const colorScheme = useColorScheme() ?? "light";
  const textColor = useThemeColor(colorScheme, "text");
  const borderColor = useThemeColor(colorScheme, "borderColor");

  return (
    <View
      style={[
        styles.header,
        {
          borderBottomWidth: 0.5,
          borderBottomColor: borderColor,
        },
      ]}
    >
      <MyText style={[styles.headerText, { color: textColor }]} weight="600">
        Kakeiboo
      </MyText>
      <View />
      <TouchableOpacity onPress={onIconPress}>
        <Ionicons name={iconName} size={32} color={textColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 32,
  },
});
