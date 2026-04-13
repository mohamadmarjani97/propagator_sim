import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ObservationCard } from "../../components/ObservationCard";
import { AppCard } from "../../components/AppCard";
import { observations, species, wetlands } from "../../data/dummyData";
import { colors, spacing } from "../../theme/theme";

export function ExploreScreen(): JSX.Element {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Explore</Text>
      <Text style={styles.subheading}>
        Observation feed, species profiles, and wetland intelligence.
      </Text>

      <AppCard>
        <Text style={styles.sectionTitle}>Observation feed filters</Text>
        <Text style={styles.filter}>Species: Any</Text>
        <Text style={styles.filter}>Distance: 0-10 km</Text>
        <Text style={styles.filter}>Date: Last 30 days</Text>
        <Text style={styles.filter}>Wetland type: Freshwater Marsh</Text>
      </AppCard>

      <Text style={styles.sectionHeader}>Recent observations</Text>
      {observations.map((observation) => (
        <ObservationCard
          key={observation.id}
          observation={observation}
          species={species.find((item) => item.id === observation.speciesId)}
        />
      ))}

      <Text style={styles.sectionHeader}>Species profiles</Text>
      {species.map((item) => (
        <AppCard key={item.id}>
          <Text style={styles.sectionTitle}>{item.commonName}</Text>
          <Text style={styles.subtitle}>{item.scientificName}</Text>
          <Text style={styles.body}>Habitat: {item.habitatPreferences.join(", ")}</Text>
          <Text style={styles.body}>Seasonality: {item.seasonalOccurrence}</Text>
          <Text style={styles.body}>Conservation: {item.conservationStatus}</Text>
        </AppCard>
      ))}

      <Text style={styles.sectionHeader}>Wetland detail pages</Text>
      {wetlands.map((wetland) => (
        <AppCard key={wetland.id}>
          <Text style={styles.sectionTitle}>{wetland.name}</Text>
          <Text style={styles.body}>Type: {wetland.wetlandType}</Text>
          <Text style={styles.body}>
            Habitat condition: {wetland.habitatQualityScore}/100
          </Text>
          <Text style={styles.body}>
            Biodiversity score: {wetland.biodiversityScore}/100
          </Text>
          <Text style={styles.body}>
            Threat indicators: {wetland.threatIndicators.join(", ")}
          </Text>
        </AppCard>
      ))}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md },
  heading: { color: colors.text, fontWeight: "800", fontSize: 24 },
  subheading: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.md },
  sectionHeader: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.muted,
    fontStyle: "italic",
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  filter: {
    color: colors.secondary,
    marginBottom: spacing.xs,
    fontWeight: "600",
  },
  bottomSpace: { height: spacing.xl },
});
