import { DefaultTheme } from "@react-navigation/native";

export const colors = {
  bg: "#F2F8F4",
  surface: "#FFFFFF",
  primary: "#2D6A4F",
  secondary: "#40916C",
  accent: "#3A86A8",
  earth: "#8C6A43",
  text: "#1B4332",
  muted: "#5C6E63",
  border: "#DCE7DF",
  success: "#2A9D8F",
  warning: "#E9C46A",
  danger: "#D64545",
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
};

export const radius = {
  md: 14,
  lg: 20,
  pill: 999,
};

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.surface,
    primary: colors.primary,
    text: colors.text,
    border: colors.border,
  },
};
