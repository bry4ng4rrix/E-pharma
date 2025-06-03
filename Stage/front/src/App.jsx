import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Dashboard/Home';
import Ventes from './pages/Dashboard/Ventes';
import Produits from './pages/Dashboard/Produits';
import Membre from './pages/Dashboard/Membre';
import Employer from './pages/Dashboard/Employer';
import Programe from './pages/Dashboard/Programe';
import Rendevous from './pages/Dashboard/Rendevous';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Landing from './pages/landing/Acc';
import Error from './pages/Error';
import Chatbot from './pages/chatbot';
import Imc from './pages/imc';
import Td from './pages/test';
import ProtectedRoute from './pages/Dashboard/protectedroute';
import Profile from './pages/landing/profile'

export default function App() {
  return (
    <div className="">
      <Routes>
        {/* Admin routes (require is_active: true and is_superuser: true) */}
        <Route element={<ProtectedRoute requireSuperuser={true} />}>
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/vente" element={<Ventes />} />
          <Route path="/admin/produits" element={<Produits />} />
          <Route path="/admin/Membre" element={<Membre />} />
          <Route path="/admin/employer" element={<Employer />} />
          <Route path="/admin/programe" element={<Programe />} />
          <Route path="/admin/rendevous" element={<Rendevous />} />
        </Route>

        {/* User routes (require is_active: true) */}
        <Route element={<ProtectedRoute requireSuperuser={false} />}>
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/imc" element={<Imc />} />
          <Route path="/td" element={<Td />} />
          <Route path="/profile" element={<Profile />}/>
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />

        {/* Error and status routes */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}