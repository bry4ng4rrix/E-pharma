import {  Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sidebard from './components/Sidebard'
import Dashboard from './pages/dashboard'
import About from './pages/About'
import Dhome from './pages/Dashboardh'
import Test from './pages/contact'
import Service from './pages/service'

export default function App() {
  return (
    <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/dhome" element={<Dhome />}/>
          <Route path="/test" element={<Test />}/>
          <Route path="/service" element={<Service />}/>

          <Route path="/side/" element={<Sidebard/>} />
        </Routes>
    </div>
  )
} 
