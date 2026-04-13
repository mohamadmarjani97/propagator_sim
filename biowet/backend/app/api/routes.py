from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, Query

from app.api.schemas import (
    AdminSummaryOut,
    HabitatPredictionIn,
    HabitatPredictionOut,
    ImageSuggestionOut,
    ObservationIn,
    ObservationOut,
    ProfessionalReportOut,
    SpeciesOut,
    UserOut,
    ValidationIn,
    WetlandOut,
)
from app.core.security import UserRole, get_current_role, require_roles
from app.data.dummy_data import OBSERVATIONS, SPECIES, USERS, WETLANDS
from app.services.ai import predict_species_for_location, suggest_species_from_image

router = APIRouter(prefix="/v1")


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "biowet-backend"}


@router.get("/users/me", response_model=UserOut)
def me(role: UserRole = Depends(get_current_role)) -> UserOut:
    user = next((entry for entry in USERS if entry["role"] == role), USERS[0])
    return UserOut(**user)


@router.get("/species", response_model=list[SpeciesOut])
def list_species() -> list[SpeciesOut]:
    return [SpeciesOut(**item) for item in SPECIES]


@router.get("/wetlands", response_model=list[WetlandOut])
def list_wetlands() -> list[WetlandOut]:
    return [WetlandOut(**item) for item in WETLANDS]


@router.get("/observations", response_model=list[ObservationOut])
def list_observations(
    species_id: str | None = Query(default=None),
    status: str | None = Query(default=None),
) -> list[ObservationOut]:
    filtered = OBSERVATIONS
    if species_id:
        filtered = [item for item in filtered if item["species_id"] == species_id]
    if status:
        filtered = [item for item in filtered if item["status"] == status]
    return [ObservationOut(**item) for item in filtered]


@router.post("/observations", response_model=ObservationOut)
def create_observation(
    payload: ObservationIn,
    _: UserRole = Depends(get_current_role),
) -> ObservationOut:
    created = {
        "id": f"obs_{uuid4().hex[:8]}",
        "species_id": payload.species_id,
        "user_id": "usr_001",
        "wetland_id": WETLANDS[0]["id"],
        "notes": payload.notes,
        "location": payload.location.model_dump(),
        "observed_at": payload.observed_at,
        "status": "pending",
    }
    OBSERVATIONS.append(created)
    return ObservationOut(**created)


@router.post("/predictions/species", response_model=list[HabitatPredictionOut])
def infer_species(payload: HabitatPredictionIn) -> list[HabitatPredictionOut]:
    return predict_species_for_location(
        lat=payload.location.lat,
        lng=payload.location.lng,
    )


@router.post("/predictions/image", response_model=ImageSuggestionOut)
def infer_from_image(photo_url: str = Query(..., description="URL of uploaded photo")) -> ImageSuggestionOut:
    return suggest_species_from_image(photo_url)


@router.post("/admin/validation", response_model=ObservationOut)
def validate_observation(
    payload: ValidationIn,
    _: UserRole = Depends(require_roles(UserRole.ADMIN, UserRole.RESEARCHER)),
) -> ObservationOut:
    target = next(item for item in OBSERVATIONS if item["id"] == payload.observation_id)
    action_map = {"approve": "verified", "reject": "flagged", "flag": "flagged"}
    target["status"] = action_map[payload.action]
    return ObservationOut(**target)


@router.get("/admin/summary", response_model=AdminSummaryOut)
def admin_summary(
    _: UserRole = Depends(require_roles(UserRole.ADMIN, UserRole.RESEARCHER)),
) -> AdminSummaryOut:
    verified = sum(1 for item in OBSERVATIONS if item["status"] == "verified")
    pending = sum(1 for item in OBSERVATIONS if item["status"] == "pending")
    return AdminSummaryOut(
        pending_submissions=pending,
        verified_last_30d=verified,
        top_species=[SPECIES[0]["id"], SPECIES[1]["id"]],
        hotspot_wetland_ids=[WETLANDS[0]["id"]],
    )


@router.get("/pro/reports/download", response_model=ProfessionalReportOut)
def generate_professional_report(
    report_type: str = Query(
        default="habitat_trend",
        pattern="^(hotspot_monitoring|habitat_trend|species_summary)$",
    ),
    _: UserRole = Depends(require_roles(UserRole.AGENCY_PRO, UserRole.ADMIN)),
) -> ProfessionalReportOut:
    report_id = f"report_{uuid4().hex[:10]}"
    return ProfessionalReportOut(
        report_id=report_id,
        report_type=report_type,  # type: ignore[arg-type]
        download_url=f"https://storage.biowet.local/reports/{report_id}.pdf",
        generated_at=datetime.now(tz=timezone.utc),
    )
