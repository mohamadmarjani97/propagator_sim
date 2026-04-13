import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../theme/theme";

export function AppCard({ children }: PropsWithChildren): JSX.Element {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
