# BioWet Backend

FastAPI scaffold for biodiversity observations, wetland intelligence, and
AI-powered species prediction.

## Run locally

```bash
pip install -e .
uvicorn app.main:app --reload
```

## Main API groups

- Public/mobile:
  - `GET /v1/wetlands`
  - `GET /v1/species`
  - `GET /v1/observations`
  - `POST /v1/observations`
  - `POST /v1/predictions/species`
  - `POST /v1/predictions/image`
- Admin/research:
  - `POST /v1/admin/validation`
  - `GET /v1/admin/summary`
- Professional agency tier:
  - `GET /v1/pro/reports/download`

Use `X-Role` header with values: `citizen`, `researcher`, `admin`, `agency_pro`.
