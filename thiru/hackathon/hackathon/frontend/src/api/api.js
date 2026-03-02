import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 10000,
});

export function getAnalytics() {
  return api.get("/analytics");
}

export function predictMaterial(payload) {
  return api.post("/predict_material", payload);
}

export function predictEnergy(payload) {
  return api.post("/predict_energy", payload);
}

export default api;
