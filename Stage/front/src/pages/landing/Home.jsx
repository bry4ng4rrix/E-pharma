import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white rounded fixed w-full   z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo à gauche */}
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Logo"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/100x40?text=Logo')}
            />
          </div>

          {/* Menu au centre */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#home"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Boutons à droite */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-200">
              Connexion
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Inscription
            </button>
          </div>

          {/* Menu hamburger pour mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 px-4 py-4">
            <li>
              <a
                href="#home"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={toggleMenu}
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={toggleMenu}
              >
                À propos
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={toggleMenu}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={toggleMenu}
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={toggleMenu}
              >
                Contact
              </a>
            </li>
            <li>
              <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
                Connexion
              </button>
            </li>
            <li>
              <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Inscription
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Home;