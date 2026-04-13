export type UserRole = "citizen" | "researcher" | "admin" | "agency_pro";

export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  conservationStatus: string;
  habitatPreferences: string[];
  seasonalOccurrence: string;
  thumbnailUrl: string;
}

export interface Wetland {
  id: string;
  name: string;
  wetlandType: string;
  habitatQualityScore: number;
  biodiversityScore: number;
  center: {
    lat: number;
    lng: number;
  };
  threatIndicators: string[];
}

export interface Observation {
  id: string;
  speciesId: string;
  userDisplayName: string;
  wetlandId: string;
  photoUrl: string;
  notes: string;
  lat: number;
  lng: number;
  observedAt: string;
  status: "pending" | "reviewed" | "verified" | "flagged";
}

export interface HabitatPrediction {
  speciesId: string;
  confidence: number;
  bestSeason: string;
  ecologicalExplanation: string;
}
