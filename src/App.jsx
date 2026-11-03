import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Login, Register } from './pages/Auth';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Protected } from './components/Layout';
export default function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/dashboard" element={<Protected role="user"><UserDashboard/></Protected>}/><Route path="/admin" element={<Protected role="admin"><AdminDashboard/></Protected>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
