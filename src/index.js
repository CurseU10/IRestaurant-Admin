import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './bootstrap.custom.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Admin from './Pages/Admin'
import Served from './Pages/Served'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/served" element={<Served />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
