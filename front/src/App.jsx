import {  Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/dashboard'

export default function App() {
  return (
    <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
    </div>
  )
} 
