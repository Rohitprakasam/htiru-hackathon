# CIRIUS Backend (Simulated)

Simple FastAPI app that simulates predictions for the CIRIUS dashboard.

Requirements

- Python 3.10+
- See `requirements.txt`

Run locally

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Endpoints

- `GET /analytics` — returns simulated KPIs
- `POST /predict_material` — simulate material prediction
- `POST /predict_energy` — simulate energy prediction
