import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  {to: '/dashboard', label: 'Executive'},
  {to: '/energy', label: 'Energy Intelligence'},
  {to: '/material', label: 'Material Intelligence'},
  {to: '/analytics', label: 'Analytics'},
]

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="brand">CIRIUS</div>
      <nav>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive}) => isActive? 'active' : ''}>{l.label}</NavLink>
        ))}
      </nav>
    </aside>
  )
}
