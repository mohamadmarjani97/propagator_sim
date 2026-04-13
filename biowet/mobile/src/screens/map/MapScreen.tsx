import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SpeciesPredictionCard } from "../../components/SpeciesPredictionCard";
import { samplePredictions, species, wetlands } from "../../data/dummyData";
import { fetchPredictions } from "../../services/api";
import { colors, radius, spacing } from "../../theme/theme";
import { HabitatPrediction } from "../../types/models";

const layerOptions = [
  "Wetland extent",
  "Habitat suitability",
  "Biodiversity hotspots",
  "Recent sightings",
  "Water/vegetation indicators",
];

export function MapScreen(): JSX.Element {
  const [activeLayers, setActiveLayers] = useState<string[]>([
    "Wetland extent",
    "Recent sightings",
  ]);
  const [predictions, setPredictions] =
    useState<HabitatPrediction[]>(samplePredictions);

  const centeredWetland = wetlands[0];

  const wetlandById = useMemo(
    () => Object.fromEntries(wetlands.map((wetland) => [wetland.id, wetland])),
    [],
  );

  const toggleLayer = (label: string) => {
    setActiveLayers((current) =>
      current.includes(label)
        ? current.filter((existing) => existing !== label)
        : [...current, label],
    );
  };

  const runPrediction = async () => {
    const result = await fetchPredictions({
      lat: centeredWetland.center.lat,
      lng: centeredWetland.center.lng,
      timestamp: new Date().toISOString(),
    });
    setPredictions(result);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: centeredWetland.center.lat,
          longitude: centeredWetland.center.lng,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {wetlands.map((wetland) => (
          <Marker
            key={wetland.id}
            coordinate={{
              latitude: wetland.center.lat,
              longitude: wetland.center.lng,
            }}
            title={wetland.name}
            description={`Habitat score ${wetland.habitatQualityScore}`}
          />
        ))}
      </MapView>

      <View style={styles.layerPanel}>
        <Text style={styles.panelTitle}>Layers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {layerOptions.map((layer) => {
            const selected = activeLayers.includes(layer);
            return (
              <Pressable
                key={layer}
                style={[styles.layerChip, selected && styles.layerChipActive]}
                onPress={() => toggleLayer(layer)}
              >
                <Text style={[styles.layerText, selected && styles.layerTextActive]}>
                  {layer}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable style={styles.predictButton} onPress={runPrediction}>
          <Text style={styles.predictText}>What species might I see here?</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.predictions}>
        {predictions.map((prediction) => {
          const speciesInfo = species.find((item) => item.id === prediction.speciesId);
          if (!speciesInfo) {
            return null;
          }
          return (
            <SpeciesPredictionCard
              key={prediction.speciesId}
              species={speciesInfo}
              prediction={prediction}
            />
          );
        })}
        <View style={styles.detailPanel}>
          <Text style={styles.panelTitle}>{centeredWetland.name}</Text>
          <Text style={styles.detailText}>
            Habitat quality {centeredWetland.habitatQualityScore} • Biodiversity{" "}
            {centeredWetland.biodiversityScore}
          </Text>
          <Text style={styles.detailText}>
            Threat indicators: {centeredWetland.threatIndicators.join(", ")}
          </Text>
          <Text style={styles.detailText}>
            Nearby wetland count: {Object.keys(wetlandById).length}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  map: { flex: 1 },
  layerPanel: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: "#FFFFFFEE",
    borderRadius: radius.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  panelTitle: {
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  layerChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginRight: spacing.xs,
    backgroundColor: "#FFFFFF",
  },
  layerChipActive: {
    borderColor: colors.secondary,
    backgroundColor: "#EAF7EF",
  },
  layerText: {
    color: colors.muted,
    fontSize: 12,
  },
  layerTextActive: {
    color: colors.secondary,
    fontWeight: "700",
  },
  predictButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: "center",
  },
  predictText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  predictions: {
    maxHeight: 310,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  detailPanel: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  detailText: {
    color: colors.text,
    marginTop: spacing.xs,
    lineHeight: 20,
  },
});
