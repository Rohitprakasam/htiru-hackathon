import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const sample = Array.from({length:24}).map((_,i)=>({
  time: `${i}:00`,
  value: Math.round(200 + Math.sin(i/3)*60 + Math.random()*30)
}))

export default function EnergyTrend({data}){
  const d = data || sample
  return (
    <div className="card">
      <h4>Energy Consumption Trend</h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={d}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2933" />
          <XAxis dataKey="time" stroke="#9aa7b2" />
          <YAxis stroke="#9aa7b2" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
