import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AppCard } from "../../components/AppCard";
import { observations, samplePredictions, species, wetlands } from "../../data/dummyData";
import { colors, spacing } from "../../theme/theme";

export function HomeScreen(): JSX.Element {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Welcome to BioWet</Text>
      <Text style={styles.subheading}>
        Explore wetland intelligence powered by EO and AI.
      </Text>

      <TextInput
        placeholder="Search location or wetland name"
        placeholderTextColor={colors.muted}
        style={styles.search}
      />

      <View style={styles.buttonRow}>
        <AppCard>
          <Text style={styles.cardTitle}>What species can I see here?</Text>
          <Text style={styles.cardBody}>Run AI habitat inference at current GPS.</Text>
        </AppCard>
        <AppCard>
          <Text style={styles.cardTitle}>Report a sighting</Text>
          <Text style={styles.cardBody}>Upload photo, species, notes, and location.</Text>
        </AppCard>
      </View>

      <AppCard>
        <Text style={styles.cardTitle}>Nearby wetlands</Text>
        {wetlands.map((wetland) => (
          <Text key={wetland.id} style={styles.itemLine}>
            {wetland.name} • Quality {wetland.habitatQualityScore}
          </Text>
        ))}
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Recent sightings</Text>
        {observations.map((observation) => {
          const matched = species.find((s) => s.id === observation.speciesId);
          return (
            <Text key={observation.id} style={styles.itemLine}>
              {matched?.commonName ?? "Unknown"} • {observation.status}
            </Text>
          );
        })}
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Predicted species</Text>
        {samplePredictions.map((prediction) => {
          const matched = species.find((s) => s.id === prediction.speciesId);
          return (
            <Text key={prediction.speciesId} style={styles.itemLine}>
              {matched?.commonName ?? "Unknown"} •{" "}
              {(prediction.confidence * 100).toFixed(0)}%
            </Text>
          );
        })}
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Habitat health summary</Text>
        <Text style={styles.itemLine}>
          EO indicators suggest stable vegetation with localized water-stress
          pockets in the southeast corridor.
        </Text>
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  heading: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
    marginTop: spacing.sm,
  },
  subheading: {
    color: colors.muted,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  search: {
    backgroundColor: "#FFFFFF",
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginBottom: spacing.md,
    color: colors.text,
  },
  buttonRow: {
    marginBottom: spacing.sm,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.sm,
    fontSize: 16,
  },
  cardBody: {
    color: colors.muted,
    lineHeight: 20,
  },
  itemLine: {
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
});
