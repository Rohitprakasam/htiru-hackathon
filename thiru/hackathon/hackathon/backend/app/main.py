from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import random

app = FastAPI(title="CIRIUS API - Simulated")

# Allow cross-origin requests from local frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    site_id: Optional[str] = None
    data: Optional[dict] = {}


def simulated_response(kind: str):
    # Simulate probabilities and recommended actions
    if kind == "material":
        prob = round(random.uniform(0.05, 0.9), 3)
        action = "Adjust production schedule and reallocate inventory"
        improve = round(random.uniform(3.0, 25.0), 2)
    else:
        prob = round(random.uniform(0.01, 0.85), 3)
        action = "Trigger peak-shaving and activate storage discharge"
        improve = round(random.uniform(2.0, 30.0), 2)

    return {
        "probability": prob,
        "recommended_action": action,
        "predicted_improvement_percent": improve,
        "status": "Action Implemented"
    }


@app.get("/analytics")
def get_analytics():
    # Return summarized/aggregated analytics (simulated)
    return {
        "surplus_risk": round(random.uniform(0.05, 0.6), 3),
        "energy_spike_risk": round(random.uniform(0.02, 0.5), 3),
        "production_efficiency": round(random.uniform(70, 98), 2),
        "energy_stability_index": round(random.uniform(50, 99), 2),
        "estimated_co2_reduction": round(random.uniform(5, 200), 2),
        "estimated_financial_impact": round(random.uniform(1000, 250000), 2)
    }


@app.post("/predict_material")
def predict_material(req: PredictRequest):
    return simulated_response("material")


@app.post("/predict_energy")
def predict_energy(req: PredictRequest):
    return simulated_response("energy")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
