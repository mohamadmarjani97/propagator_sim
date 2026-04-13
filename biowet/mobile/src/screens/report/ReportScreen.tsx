import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppCard } from "../../components/AppCard";
import { submitObservation } from "../../services/api";
import { colors, radius, spacing } from "../../theme/theme";

export function ReportScreen(): JSX.Element {
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const [speciesName, setSpeciesName] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string>("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const submit = async () => {
    const response = await submitObservation({
      notes,
      userDisplayName: "Field User",
      lat: 51.492,
      lng: -0.104,
      observedAt: new Date().toISOString(),
      status: "pending",
    });
    setStatus(response.status);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Report a Sighting</Text>
      <Text style={styles.subheading}>
        Capture species, coordinates, timestamp, and field notes.
      </Text>

      <AppCard>
        <Text style={styles.label}>Photos</Text>
        <Pressable style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>Upload one or more photos</Text>
        </Pressable>
        {photoUri ? <Image source={{ uri: photoUri }} style={styles.preview} /> : null}
      </AppCard>

      <AppCard>
        <Text style={styles.label}>Species</Text>
        <TextInput
          placeholder="Select species or enter unknown"
          value={speciesName}
          onChangeText={setSpeciesName}
          style={styles.input}
          placeholderTextColor={colors.muted}
        />
        <Text style={styles.aiHint}>
          AI suggestion: likely Black-winged Stilt (82% confidence)
        </Text>
      </AppCard>

      <AppCard>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Behavior, habitat condition, other field notes"
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, styles.notesInput]}
          placeholderTextColor={colors.muted}
        />
        <Text style={styles.metaText}>GPS and timestamp are captured automatically.</Text>
      </AppCard>

      <Pressable style={styles.primaryButton} onPress={submit}>
        <Text style={styles.primaryButtonText}>Submit observation</Text>
      </Pressable>

      {status ? (
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>Submission status: {status}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  heading: { color: colors.text, fontWeight: "800", fontSize: 24 },
  subheading: { color: colors.muted, marginTop: spacing.xs, marginBottom: spacing.md },
  label: { color: colors.text, fontWeight: "700", marginBottom: spacing.sm },
  uploadButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F8FCF9",
  },
  uploadText: { color: colors.secondary, fontWeight: "700" },
  preview: {
    marginTop: spacing.md,
    width: "100%",
    height: 200,
    borderRadius: radius.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 11,
    color: colors.text,
    backgroundColor: "#FFFFFF",
  },
  notesInput: {
    textAlignVertical: "top",
    minHeight: 110,
  },
  aiHint: {
    marginTop: spacing.sm,
    color: colors.accent,
    fontWeight: "600",
  },
  metaText: {
    marginTop: spacing.sm,
    color: colors.muted,
  },
  primaryButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800" },
  statusPill: {
    alignSelf: "center",
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: "#E4F4EC",
  },
  statusText: {
    color: colors.success,
    fontWeight: "700",
  },
});
