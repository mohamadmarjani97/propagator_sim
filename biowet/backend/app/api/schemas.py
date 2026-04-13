from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class Coordinates(BaseModel):
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)


class UserOut(BaseModel):
    id: str
    display_name: str
    role: Literal["citizen", "researcher", "admin", "agency_pro"]
    sightings_count: int
    verified_records_count: int


class SpeciesOut(BaseModel):
    id: str
    common_name: str
    scientific_name: str
    conservation_status: str
    habitat_preferences: list[str]
    seasonal_occurrence: str


class WetlandOut(BaseModel):
    id: str
    name: str
    wetland_type: str
    habitat_quality_score: float
    biodiversity_score: float
    center: Coordinates
    threat_indicators: list[str]


class ObservationIn(BaseModel):
    species_id: str | None = None
    unknown_species_label: str | None = None
    notes: str = Field(default="", max_length=1000)
    location: Coordinates
    observed_at: datetime
    photo_urls: list[str] = Field(default_factory=list)


class ObservationOut(BaseModel):
    id: str
    species_id: str | None
    user_id: str
    wetland_id: str | None
    notes: str
    location: Coordinates
    observed_at: datetime
    status: Literal["pending", "reviewed", "verified", "flagged"]


class HabitatPredictionIn(BaseModel):
    location: Coordinates
    timestamp: datetime | None = None
    include_explanation: bool = True


class HabitatPredictionOut(BaseModel):
    species_id: str
    confidence: float = Field(ge=0, le=1)
    best_season: str
    ecological_explanation: str


class ImageSuggestionOut(BaseModel):
    suggested_species_id: str | None
    confidence: float = Field(ge=0, le=1)
    alternatives: list[str]


class ValidationIn(BaseModel):
    observation_id: str
    action: Literal["approve", "reject", "flag"]
    reviewer_notes: str = Field(default="", max_length=500)


class AdminSummaryOut(BaseModel):
    pending_submissions: int
    verified_last_30d: int
    top_species: list[str]
    hotspot_wetland_ids: list[str]


class ProfessionalReportOut(BaseModel):
    report_id: str
    report_type: Literal["hotspot_monitoring", "habitat_trend", "species_summary"]
    download_url: str
    generated_at: datetime
