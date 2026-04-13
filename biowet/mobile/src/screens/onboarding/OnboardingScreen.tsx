import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, radius, spacing } from "../../theme/theme";
import { AppCard } from "../../components/AppCard";

interface Props {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: Props): JSX.Element {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>BioWet</Text>
      <Text style={styles.hero}>Wetland biodiversity intelligence for everyone.</Text>
      <Text style={styles.subtitle}>
        Use EO + AI + citizen science to discover species, report sightings, and
        support conservation action.
      </Text>

      <AppCard>
        <Text style={styles.cardTitle}>How BioWet works</Text>
        <Text style={styles.cardBody}>
          1) EO layers track water and vegetation conditions.{"\n"}
          2) AI predicts likely species at your location.{"\n"}
          3) Community observations improve habitat intelligence.
        </Text>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Permissions</Text>
        <Text style={styles.cardBody}>
          Enable location, camera, and notifications for full functionality.
        </Text>
        <Pressable
          onPress={() => setPermissionsGranted(true)}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Grant permissions</Text>
        </Pressable>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Sign in</Text>
        <View style={styles.authButtons}>
          <Pressable style={styles.authButton}>
            <Text style={styles.authText}>Continue with Email</Text>
          </Pressable>
          <Pressable style={styles.authButton}>
            <Text style={styles.authText}>Continue with Google</Text>
          </Pressable>
          <Pressable style={styles.authButton}>
            <Text style={styles.authText}>Continue with Apple</Text>
          </Pressable>
        </View>
      </AppCard>

      <Pressable
        style={[styles.primaryButton, !permissionsGranted && styles.disabled]}
        onPress={onComplete}
        disabled={!permissionsGranted}
      >
        <Text style={styles.primaryButtonText}>Enter BioWet</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  brand: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 32,
    marginTop: spacing.md,
  },
  hero: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 24,
    marginTop: spacing.md,
    lineHeight: 32,
  },
  subtitle: {
    color: colors.muted,
    marginTop: spacing.sm,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  cardBody: {
    color: colors.muted,
    lineHeight: 21,
  },
  secondaryButton: {
    marginTop: spacing.sm,
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    borderColor: colors.secondary,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
  },
  secondaryButtonText: {
    color: colors.secondary,
    fontWeight: "700",
  },
  authButtons: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  authButton: {
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#F7FCF8",
  },
  authText: {
    color: colors.text,
    fontWeight: "600",
  },
  primaryButton: {
    marginTop: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.4,
  },
});
