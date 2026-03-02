import React from 'react'
import Sidebar from '../components/Sidebar'
import PredictionPanel from '../components/PredictionPanel'

export default function Material(){
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <header className="main-header"><h1>Material Intelligence</h1></header>
        <section className="grid">
          <div className="card">
            <h4>Inventory vs Rolling Demand</h4>
            <p>Chart placeholder</p>
          </div>
          <div className="card">
            <h4>Surplus Probability Trend</h4>
            <p>Chart placeholder</p>
          </div>
          <div className="card">
            <h4>Production Adjustment Simulation</h4>
            <p>Simulation placeholder</p>
          </div>
          <PredictionPanel kind="material" />
          <div className="card small">
            <h4>Efficiency Score</h4>
            <div className="big">91%</div>
          </div>
          <div className="card">
            <h4>Recommended Actions</h4>
            <p>Reduce batch sizes; reassign inventory buffers</p>
          </div>
        </section>
      </main>
    </div>
  )
}
