import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const navigate = useNavigate()
  function submit(e){
    e.preventDefault()
    // trivial local-login for scaffold
    navigate('/dashboard')
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <h2>Company Login</h2>
        <label>Company ID</label>
        <input placeholder="company-123" defaultValue="company-123" />
        <label>Password</label>
        <input type="password" placeholder="••••••" />
        <button className="btn">Sign in</button>
      </form>
    </div>
  )
}
