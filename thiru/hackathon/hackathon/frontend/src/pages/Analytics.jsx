import React from 'react'
import Sidebar from '../components/Sidebar'

export default function Analytics(){
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <header className="main-header"><h1>Analytics</h1></header>
        <section className="grid">
          <div className="card">
            <h4>Monthly Risk Trend</h4>
            <p>Chart placeholder</p>
          </div>
          <div className="card">
            <h4>Independent vs Coordinated Performance</h4>
            <p>Bar chart placeholder</p>
          </div>
          <div className="card">
            <h4>Risk Distribution</h4>
            <p>Pie chart placeholder</p>
          </div>
          <div className="card small">
            <h4>Estimated CO2 Reduction</h4>
            <div className="big">120 tCO2e</div>
          </div>
          <div className="card small">
            <h4>Estimated Financial Impact</h4>
            <div className="big">$42,500</div>
          </div>
        </section>
      </main>
    </div>
  )
}
