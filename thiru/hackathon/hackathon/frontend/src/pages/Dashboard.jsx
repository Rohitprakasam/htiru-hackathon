import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import KPICard from '../components/KPICard'
import EnergyTrend from '../components/charts/EnergyTrend'
import { getAnalytics } from '../api/api'

export default function Dashboard(){
  const [analytics, setAnalytics] = useState(null)

  useEffect(()=>{
    getAnalytics().then(r=>setAnalytics(r.data)).catch(()=>{})
  },[])

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <header className="main-header"><h1>Executive Dashboard</h1></header>
        <section className="kpi-row">
          <KPICard title="Surplus Risk %" value={analytics? Math.round(analytics.surplus_risk*100): '--'} suffix="%" />
          <KPICard title="Energy Spike Risk %" value={analytics? Math.round(analytics.energy_spike_risk*100): '--'} suffix="%" />
          <KPICard title="Production Efficiency %" value={analytics? analytics.production_efficiency: '--'} suffix="%" />
          <KPICard title="Energy Stability Index" value={analytics? analytics.energy_stability_index: '--'} />
        </section>

        <section className="grid">
          <EnergyTrend />
          <div className="card">
            <h4>Material Surplus Trend</h4>
            <p>Placeholder chart component — add a line chart here.</p>
          </div>
          <div className="card">
            <h4>Resource Allocation</h4>
            <p>Pie chart placeholder</p>
          </div>
          <div className="card">
            <h4>Production vs Demand</h4>
            <p>Bar chart placeholder</p>
          </div>

          <div className="card small">
            <h4>Predicted Waste Reduction %</h4>
            <div className="big">{analytics? Math.round(analytics.estimated_co2_reduction/2) + '%' : '--'}</div>
          </div>

          <div className="card small">
            <h4>Estimated Cost Savings</h4>
            <div className="big">{analytics? '$' + analytics.estimated_financial_impact : '--'}</div>
          </div>

          <div className="card">
            <h4>Control Status</h4>
            <ul>
              <li>Preventive Action Triggered</li>
              <li>Production Reduced by 4%</li>
              <li>Load Stabilized by 12%</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}
