# BioWet Architecture Blueprint

## 1) UI/UX screen structure

### A. Onboarding + auth

1. Splash / welcome
2. EO + AI + citizen-science explainer
3. Permissions request (location, camera, notifications)
4. Sign in (email / Google / Apple)

### B. Bottom tab navigation (mobile-first)

- **Home**: search, quick insights cards, nearby wetlands, predictions
- **Map**: full-screen GIS map with layers + tap-to-predict
- **Report**: submit sightings with photo, notes, and geolocation
- **Explore**: observation feed, species pages, wetland profile previews
- **Profile**: user stats, favorites, badges, settings, premium upsell

### C. Role-specific screens

- **Researcher/Expert dashboard**: advanced filters, analytics panels
- **Admin dashboard**: moderation queue and data-layer management
- **Agency Pro suite**: downloadable reports, hotspot monitoring, trend views

## 2) Database schema (geospatial-ready)

The scaffold SQL lives at:

`backend/app/data/schema.sql`

Core tables/collections:

- `users`
- `species`
- `wetlands` (polygon + center point geometry)
- `observations` (status lifecycle + point geometry)
- `photos`
- `habitat_predictions`
- `environmental_layers`
- `validation_status`
- `notifications`
- `favorite_places`
- `professional_reports` (premium tier)

## 3) Backend API structure

Base URL: `/v1`

### Public/mobile

- `GET /health`
- `GET /users/me`
- `GET /species`
- `GET /wetlands`
- `GET /observations`
- `POST /observations`
- `POST /predictions/species`
- `POST /predictions/image`

### Admin/research

- `POST /admin/validation` (approve/reject/flag)
- `GET /admin/summary`

### Premium/professional (agency tier)

- `GET /pro/reports/download`

Role model: `X-Role` header (`citizen`, `researcher`, `admin`, `agency_pro`).

## 4) Example AI inference flow

### "What species might I see here?"

1. User taps map location or uses GPS.
2. Mobile app sends coordinates + timestamp to `POST /predictions/species`.
3. Backend resolves EO context (mocked in scaffold; production: NDVI, water
   indices, rainfall, temperature, land cover, season).
4. Habitat model returns top species with confidence scores and ecological
   explanations.
5. App renders species prediction cards with confidence, season, and rationale.

### Image-based species suggestion (report flow)

1. User uploads photo in Report screen.
2. Photo URL is sent to `POST /predictions/image`.
3. AI image classifier returns likely species + alternatives + confidence.
4. User confirms/edit species before final observation submission.

## 5) UX flow mapping

1. New user signs up and grants permissions in Onboarding.
2. User opens Map and taps location.
3. App returns nearby wetlands + likely species predictions.
4. User visits wetland and submits sighting with photo + notes.
5. Admin/researcher validates submission.
6. Verified records improve map layers and species intelligence outputs.

## 6) Offline and field support

- Offline mode toggle is scaffolded in mobile state store.
- API layer includes graceful prediction fallback for disconnected environments.
- Production recommendation: sync queue for offline observation uploads.

## 7) Premium / professional layer

Agency Pro and conservation organizations receive:

- Biodiversity hotspot monitoring dashboards
- Habitat trend summaries over time windows
- Downloadable PDF/CSV report exports
- High-confidence record filters and review analytics

## 8) Code scaffold pointers

- Mobile entry: `mobile/App.tsx`
- Navigation: `mobile/src/navigation/RootNavigator.tsx`
- Main screens: `mobile/src/screens/**`
- Shared types/data: `mobile/src/types`, `mobile/src/data`
- Backend app: `backend/app/main.py`
- API contracts: `backend/app/api/schemas.py`
- Routes: `backend/app/api/routes.py`
- AI stubs: `backend/app/services/ai.py`
