import React from 'react'

export default function KPICard({title, value, suffix}){
  return (
    <div className="kpi-card">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}{suffix ? <span className="kpi-suffix">{suffix}</span> : null}</div>
    </div>
  )
}
