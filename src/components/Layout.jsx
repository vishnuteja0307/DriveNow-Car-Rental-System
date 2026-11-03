import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/storage';
export function Navbar(){
  const user=getCurrentUser(), navigate=useNavigate();
  const signOut=()=>{logout();navigate('/login');};
  return <header className="navbar"><Link className="logo" to="/">Drive<span>Now</span></Link>{user ? <div className="nav-user"><span>{user.role==='admin'?'Administrator':`Hi, ${user.name}`}</span><button className="btn btn-dark" onClick={signOut}>Logout</button></div> : <nav><Link to="/">Home</Link><Link to="/login">Login</Link><Link className="btn btn-red" to="/register">Register</Link></nav>}</header>;
}
export function Footer(){return <footer>© 2026 DriveNow. Car rental made simple.</footer>;}
export function Protected({role,children}){const user=getCurrentUser(); if(!user || (role && user.role!==role)) return <div className="dashboard"><h2>Access denied</h2><p className="muted">Please log in with the correct account.</p><Link className="btn btn-red" to="/login">Go to Login</Link></div>; return children;}
