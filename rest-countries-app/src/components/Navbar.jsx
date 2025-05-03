import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ onSearch, onFilter, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Optional: close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className="bg-blue-900 text-white shadow-md w-full z-50 sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img
            src="https://i.postimg.cc/d3qbx7SW/AyuLogo.png"
            alt="Logo"
            className="h-12 w-12 rounded-full border-2 border-white bg-white"
          />
          <span className="text-xl font-bold tracking-wide">Regions Explorer</span>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FaTimes className="h-7 w-7 text-white" />
            ) : (
              <FaBars className="h-7 w-7 text-white" />
            )}
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/favorites" className="font-semibold hover:text-orange-300">
            FAVORITES
          </Link>
          <Link to="/" className="font-semibold hover:text-orange-300">
            HOME
          </Link>
         
          <button
            onClick={onLogout}
            className="font-semibold hover:text-orange-300 focus:outline-none"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden bg-blue-900 w-full px-4 pb-4 flex flex-col space-y-3 animate-fade-in-down">
          <Link
            to="/favorites"
            className="font-semibold hover:text-orange-300"
            onClick={handleNavClick}
          >
            FAVORITES
          </Link>
          <Link
            to="/home"
            className="font-semibold hover:text-orange-300"
            onClick={handleNavClick}
          >
            HOME
          </Link>
         
          <button
            onClick={() => {
              onLogout();
              handleNavClick();
            }}
            className="font-semibold hover:text-orange-300 text-left"
          >
            LOGOUT
          </button>
        </div>
      )}
    </nav>
  );
}
