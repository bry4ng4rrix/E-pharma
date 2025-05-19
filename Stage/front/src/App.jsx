import {  Routes, Route } from 'react-router-dom'
import Home from './pages/Dashboard/Home'
import Ventes from './pages/Dashboard/Ventes'
import Produits from './pages/Dashboard/Produits'
import Utilisateur from './pages/Dashboard/Utilisateurs'
import Employer from './pages/Dashboard/Employer'
import Programe from './pages/Dashboard/Programe'
import Garde from './pages/Dashboard/Garde'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import Landing from './pages/landing/Acc'
import Error from './pages/Error'

export default function App() {
  return (
    <div className=''>
        <Routes>
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/vente" element={<Ventes />} />
          <Route path="/admin/produits" element={<Produits />} />
          <Route path="/admin/utilisateur" element={<Utilisateur />} />
          <Route path="/admin/employer" element={<Employer />} />
          <Route path="/admin/programe" element={<Programe />} />
          <Route path="/admin/Garde" element={<Garde />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Error />} />

          

        </Routes>
    </div>
  )
} 
