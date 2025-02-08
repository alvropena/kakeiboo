import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useThemeColor } from "../constants/theme";
import MyText from "./my-text";

type IconProps = {
  name: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

type HeaderProps = {
  title: string;
  rightIcons?: IconProps[];
};

export default function Header({ title, rightIcons }: HeaderProps) {
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
        {title}
      </MyText>
      <View style={styles.rightContainer}>
        {rightIcons?.map((icon, index) => (
          <TouchableOpacity key={index} onPress={icon.onPress}>
            <Ionicons name={icon.name} size={28} color={textColor} />
          </TouchableOpacity>
        ))}
      </View>
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
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 32,
  },
});
