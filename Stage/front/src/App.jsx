import { Routes, Route, Navigate } from 'react-router-dom';
import Page from './Home/Landing'


export default function App() {
  return (
    <div className="">
      <Routes>
      
        {/* Public routes */}
        <Route path="/" element={<Page />} />

      </Routes>
    </div>
  );
}