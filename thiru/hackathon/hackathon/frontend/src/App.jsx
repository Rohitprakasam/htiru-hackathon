import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Energy from './pages/Energy'
import Material from './pages/Material'
import Analytics from './pages/Analytics'

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/energy" element={<Energy/>} />
      <Route path="/material" element={<Material/>} />
      <Route path="/analytics" element={<Analytics/>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
