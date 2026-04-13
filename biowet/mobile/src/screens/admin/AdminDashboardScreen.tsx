import { ScrollView, StyleSheet, Text } from "react-native";
import { AppCard } from "../../components/AppCard";
import { observations, species } from "../../data/dummyData";
import { colors, spacing } from "../../theme/theme";

export function AdminDashboardScreen(): JSX.Element {
  const pending = observations.filter((item) => item.status === "pending");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Admin / Expert Dashboard</Text>
      <Text style={styles.subheading}>
        Review submissions, validate content, and manage habitat intelligence.
      </Text>

      <AppCard>
        <Text style={styles.sectionTitle}>Pending moderation queue</Text>
        {pending.map((item) => {
          const label = species.find((entry) => entry.id === item.speciesId)?.commonName;
          return (
            <Text key={item.id} style={styles.line}>
              {label ?? "Unknown species"} • {item.userDisplayName} • {item.status}
            </Text>
          );
        })}
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Analytics snapshot</Text>
        <Text style={styles.line}>Submission trend (30d): +18%</Text>
        <Text style={styles.line}>Most observed species: Black-winged Stilt</Text>
        <Text style={styles.line}>Current hotspot: Emerald Marsh Reserve</Text>
        <Text style={styles.line}>Active users this month: 268</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Professional tier actions</Text>
        <Text style={styles.line}>- Download PDF/CSV biodiversity reports</Text>
        <Text style={styles.line}>- Export hotspot trend summaries</Text>
        <Text style={styles.line}>- Compare habitat suitability time windows</Text>
        <Text style={styles.line}>- Trigger agency alert subscriptions</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Data administration</Text>
        <Text style={styles.line}>Manage species database</Text>
        <Text style={styles.line}>Update EO environmental layers</Text>
        <Text style={styles.line}>Flag inappropriate uploads</Text>
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  heading: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  subheading: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    color: colors.muted,
    lineHeight: 20,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  line: {
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
});
