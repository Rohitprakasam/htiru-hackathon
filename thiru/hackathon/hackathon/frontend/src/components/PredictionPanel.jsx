import React, {useState} from 'react'
import { predictEnergy, predictMaterial } from '../api/api'

export default function PredictionPanel({kind='energy'}){
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function run(){
    setLoading(true)
    setError(null)
    setResult(null)
    try{
      const payload = { site_id: 'company-123', data: {} }
      const res = kind === 'energy' ? await predictEnergy(payload) : await predictMaterial(payload)
      setResult(res.data)
    }catch(e){
      setError(e.message || 'Request failed')
    }finally{ setLoading(false) }
  }

  return (
    <div className="card">
      <h4>{kind === 'energy' ? 'Energy Prediction' : 'Material Prediction'}</h4>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <button className="btn" onClick={run} disabled={loading}>{loading? 'Running...':'Run Prediction'}</button>
        {error && <div style={{color:'#ff8080'}}>{error}</div>}
      </div>

      {result && (
        <div style={{marginTop:12}}>
          <div><strong>Probability:</strong> {result.probability}</div>
          <div><strong>Recommended action:</strong> {result.recommended_action}</div>
          <div><strong>Predicted improvement %:</strong> {result.predicted_improvement_percent}</div>
          <div><strong>Status:</strong> {result.status}</div>
        </div>
      )}
    </div>
  )
}
