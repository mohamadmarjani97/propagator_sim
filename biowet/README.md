# BioWet

BioWet is a cross-platform mobile platform for wetland biodiversity and
habitat intelligence. It combines:

- Earth Observation (EO) environmental layers
- AI habitat suitability predictions
- Volunteered Geographic Information (VGI) sightings
- Expert moderation and analytics for conservation teams

## Repository layout

```text
biowet/
  mobile/   # React Native (Expo) application for iOS + Android
  backend/  # FastAPI service with AI inference stubs and geospatial APIs
  docs/     # Product architecture, schema, and API design notes
```

## Key capabilities

- Explore wetlands and biodiversity hotspots on map layers
- Ask: "What species might I see here?"
- Submit geotagged species sightings with photos
- Track submission verification lifecycle
- Access professional analytics and downloadable reports (premium tier)
- Moderate submissions in an admin dashboard

## Quick start

### Mobile (Expo)

```bash
cd biowet/mobile
npm install
npm run start
```

### Backend (FastAPI)

```bash
cd biowet/backend
python -m venv .venv
source .venv/bin/activate
pip install -e .
uvicorn app.main:app --reload
```

Read `docs/architecture.md` for the full UI structure, API design, database
schema, and AI inference flow.
