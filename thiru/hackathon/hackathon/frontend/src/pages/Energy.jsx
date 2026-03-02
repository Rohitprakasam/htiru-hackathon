import React from 'react'
import Sidebar from '../components/Sidebar'
import EnergyTrend from '../components/charts/EnergyTrend'
import PredictionPanel from '../components/PredictionPanel'

export default function Energy(){
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <header className="main-header"><h1>Energy Intelligence</h1></header>
        <section className="grid">
          <EnergyTrend />
          <div className="card">
            <h4>Rolling Mean Overlay & Spike markers</h4>
            <p>Sample overlay placeholder</p>
          </div>
          <div className="card">
            <h4>Before vs After Load Reduction</h4>
            <p>Comparison graph placeholder</p>
          </div>
          <PredictionPanel kind="energy" />
          <div className="card">
            <h4>Recommended Actions</h4>
            <p>Activate storage discharge; reduce non-critical loads</p>
          </div>
        </section>
      </main>
    </div>
  )
}
