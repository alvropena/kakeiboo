// Base palette - single source of truth for hex values
const palette = {
  white: '#FFFFFF',
  black: '#121212',     // Slightly softer than pure black
  gray100: '#F8F9FA',   // Lighter, softer gray
  gray600: '#6C757D',   // More muted medium gray
  gray900: '#212529',   // Softer dark gray
  gray500: '#ADB5BD',   // Softer medium gray
  blue: '#3B82F6',      // Softer, more pleasant blue
  green: '#22C55E',     // Softer, more natural green
  red: '#EF4444',       // Softer, less aggressive red
};

interface ColorSchemeColors {
  background: string;
  text: string;
  secondaryText: string;
  buttonBackground: string;
  buttonText: string;
  positiveAmount: string;
  negativeAmount: string;
  disabledBackground: string;
  disabledText: string;
  borderColor: string;
  primary: string;
  cardBackground: string;
  dateText: string;
}

interface ThemeColors {
  light: ColorSchemeColors;
  dark: ColorSchemeColors;
}

export const colors: ThemeColors = {
  light: {
    background: palette.white,
    text: palette.black,
    secondaryText: palette.gray600,
    buttonBackground: palette.gray100,
    buttonText: palette.black,
    positiveAmount: palette.green,
    negativeAmount: palette.red,
    disabledBackground: palette.gray100,
    disabledText: palette.gray500,
    borderColor: palette.gray100,
    primary: palette.blue,
    cardBackground: palette.white,
    dateText: palette.gray600,
  },
  dark: {
    background: palette.black,
    text: palette.white,
    secondaryText: palette.gray500,
    buttonBackground: palette.gray900,
    buttonText: palette.white,
    positiveAmount: palette.green,
    negativeAmount: palette.red,
    disabledBackground: palette.gray900,
    disabledText: palette.gray600,
    borderColor: palette.gray900,
    primary: palette.blue,
    cardBackground: palette.black,
    dateText: palette.gray500,
  },
};

export const useThemeColor = (colorScheme: 'light' | 'dark', key: keyof ColorSchemeColors) => {
  return colors[colorScheme][key];
};
