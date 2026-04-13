import { StyleSheet, Text, View } from "react-native";
import { HabitatPrediction, Species } from "../types/models";
import { colors, spacing } from "../theme/theme";
import { AppCard } from "./AppCard";

interface Props {
  species: Species;
  prediction: HabitatPrediction;
}

export function SpeciesPredictionCard({ species, prediction }: Props): JSX.Element {
  return (
    <AppCard>
      <Text style={styles.name}>{species.commonName}</Text>
      <Text style={styles.scientific}>{species.scientificName}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Confidence</Text>
        <Text style={styles.value}>
          {(prediction.confidence * 100).toFixed(0)}
          %
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Best season</Text>
        <Text style={styles.value}>{prediction.bestSeason}</Text>
      </View>
      <Text style={styles.explanation}>{prediction.ecologicalExplanation}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
  scientific: {
    color: colors.muted,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.muted,
    fontWeight: "500",
  },
  value: {
    color: colors.primary,
    fontWeight: "700",
  },
  explanation: {
    marginTop: spacing.sm,
    color: colors.text,
    lineHeight: 20,
  },
});
