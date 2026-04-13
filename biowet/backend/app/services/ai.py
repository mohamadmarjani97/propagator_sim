from random import Random

from app.api.schemas import HabitatPredictionOut, ImageSuggestionOut
from app.data.dummy_data import SPECIES


RNG = Random(42)


def predict_species_for_location(lat: float, lng: float) -> list[HabitatPredictionOut]:
    """Scaffold habitat suitability inference driven by EO-like features.

    In production this function would call an ML service using EO variables
    (e.g., NDVI, water extent, temperature, precipitation, salinity).
    """
    predictions: list[HabitatPredictionOut] = []
    for item in SPECIES:
        confidence = max(0.3, min(0.95, RNG.random() * 0.6 + 0.35))
        predictions.append(
            HabitatPredictionOut(
                species_id=item["id"],
                confidence=round(confidence, 2),
                best_season="Spring",
                ecological_explanation=(
                    "EO-derived moisture and vegetation indicators suggest "
                    f"{item['common_name']} suitability near ({lat:.3f}, {lng:.3f})."
                ),
            )
        )
    return sorted(predictions, key=lambda p: p.confidence, reverse=True)[:5]


def suggest_species_from_image(_: str) -> ImageSuggestionOut:
    """Scaffold image classifier output for uploaded observation photos."""
    primary = SPECIES[0]
    alternatives = [item["id"] for item in SPECIES[1:3]]
    return ImageSuggestionOut(
        suggested_species_id=primary["id"],
        confidence=0.82,
        alternatives=alternatives,
    )
