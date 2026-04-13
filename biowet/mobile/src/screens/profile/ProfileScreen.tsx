import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AppCard } from "../../components/AppCard";
import { colors, radius, spacing } from "../../theme/theme";

interface Props {
  onOpenAdmin: () => void;
}

export function ProfileScreen({ onOpenAdmin }: Props): JSX.Element {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.subheading}>Citizen Scientist Level 4</Text>

      <AppCard>
        <Text style={styles.cardTitle}>Your impact</Text>
        <Text style={styles.metric}>Sightings submitted: 48</Text>
        <Text style={styles.metric}>Verified records: 31</Text>
        <Text style={styles.metric}>Favorite wetlands: 6</Text>
        <Text style={styles.metric}>Achievement badges: Field Mapper, Amphibian Watch</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Settings</Text>
        <Text style={styles.metric}>Account details</Text>
        <Text style={styles.metric}>Notification preferences</Text>
        <Text style={styles.metric}>Offline cache controls</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>BioWet Pro for agencies</Text>
        <Text style={styles.description}>
          Unlock advanced hotspot monitoring, trend analytics, downloadable
          reports, and custom conservation dashboards.
        </Text>
        <View style={styles.badges}>
          <Text style={styles.badge}>Hotspot Alerts</Text>
          <Text style={styles.badge}>Trend Summaries</Text>
          <Text style={styles.badge}>CSV/PDF Reports</Text>
        </View>
      </AppCard>

      <Pressable style={styles.adminButton} onPress={onOpenAdmin}>
        <Text style={styles.adminText}>Open Admin / Expert Dashboard</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  heading: { color: colors.text, fontWeight: "800", fontSize: 24 },
  subheading: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.md },
  cardTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.sm,
    fontSize: 16,
  },
  metric: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.muted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  badge: {
    borderRadius: radius.pill,
    backgroundColor: "#E6F2FF",
    color: colors.accent,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    overflow: "hidden",
    fontWeight: "700",
    fontSize: 12,
  },
  adminButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.secondary,
    borderRadius: radius.pill,
    paddingVertical: 13,
    alignItems: "center",
  },
  adminText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});
