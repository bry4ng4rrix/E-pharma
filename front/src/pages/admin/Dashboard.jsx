
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar'
import DashboardHome from './Contenue';
import Sidebard from '../../components/Sidebard';
 

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
 
 
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
 
  
 

  return (
    <div className="min-h-screen fixed  w-full fd">
      {/* Navbar */}
      <Navbar togle={toggleSidebar}/>

      {/* Sidebar */}
     <Sidebard isSidebarOpen={isSidebarOpen} isMobileMenuOpen={isMobileMenuOpen}/>
          
      {/* Contenu principal */}
      <div
        className={`mt-10 p-4 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'sm:ml-60' : 'sm:ml-20'
        }`}
      >
        <div className="p-4 border-2 bg-slate-400  border-gray-800  border-dashed rounded-lg dark:border-gray-700 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
           
              <DashboardHome />
          
           
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
