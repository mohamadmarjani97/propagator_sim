import { samplePredictions } from "../data/dummyData";
import { HabitatPrediction, Observation } from "../types/models";

const API_BASE_URL = "https://api.biowet.local/v1";

export interface PredictionRequest {
  lat: number;
  lng: number;
  timestamp?: string;
}

export async function fetchPredictions(
  request: PredictionRequest,
): Promise<HabitatPrediction[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/predictions/species`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error("Prediction API unavailable");
    }
    return (await response.json()) as HabitatPrediction[];
  } catch {
    // Fallback keeps UX functional in offline/demo mode.
    return samplePredictions;
  }
}

export async function submitObservation(
  payload: Partial<Observation>,
): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/observations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    return { status: "queued_offline" };
  }
  return (await response.json()) as { status: string };
}
