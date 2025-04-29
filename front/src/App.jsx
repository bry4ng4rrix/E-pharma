import {  Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sidebard from './components/Sidebard'

export default function App() {
  return (
    <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/side/" element={<Sidebard/>} />
        </Routes>
    </div>
  )
} 
