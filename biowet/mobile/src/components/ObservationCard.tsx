import { Image, StyleSheet, Text, View } from "react-native";
import { Observation, Species } from "../types/models";
import { colors, radius, spacing } from "../theme/theme";
import { AppCard } from "./AppCard";

interface Props {
  observation: Observation;
  species: Species | undefined;
}

export function ObservationCard({ observation, species }: Props): JSX.Element {
  return (
    <AppCard>
      <Image source={{ uri: observation.photoUrl }} style={styles.image} />
      <View style={styles.metaRow}>
        <Text style={styles.speciesName}>{species?.commonName ?? "Unknown species"}</Text>
        <Text style={styles.status}>{observation.status.toUpperCase()}</Text>
      </View>
      <Text style={styles.caption}>{observation.notes}</Text>
      <Text style={styles.detail}>
        {observation.userDisplayName} • {new Date(observation.observedAt).toDateString()}
      </Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 170,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  speciesName: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  status: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: 12,
  },
  caption: {
    marginTop: spacing.xs,
    color: colors.text,
    lineHeight: 20,
  },
  detail: {
    marginTop: spacing.sm,
    color: colors.muted,
    fontSize: 12,
  },
});
