import {  Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/admin/Dashboard'
import Produits from './pages/admin/Produits'
import Vente from './pages/admin/Vente'
import Utilisateurs from './pages/admin/Utilisateurs'

export default function App() {
  return (
    <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/produit" element={<Produits/>} />
          <Route path="/admin/vente" element={<Vente/>} />
          <Route path="/admin/utilisateurs" element={<Utilisateurs/>} />

        </Routes>
    </div>
  )
} 
