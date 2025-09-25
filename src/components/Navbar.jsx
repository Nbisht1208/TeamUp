import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-600 text-white shadow-lg">
      <div className=" mx-auto sm:pb-0.5 px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-white">TeamUP</NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/login"
              className={({ isActive }) => 
                `px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105 ${
                  isActive 
                    ? 'bg-blue-800 hover:bg-blue-900' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`
              }
            >
              LOGIN
            </NavLink>
            <NavLink 
              to="/register"
              className={({ isActive }) => 
                `px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105 ${
                  isActive 
                    ? 'bg-blue-800 hover:bg-blue-900' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`
              }
            >
              SIGNUP
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200 p-2"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700 rounded-md mb-1">
              <NavLink 
                to="/login"
                className={({ isActive }) => 
                  `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                    isActive 
                      ? 'bg-blue-900 hover:bg-blue-950' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </NavLink>
              <NavLink 
                to="/register"
                className={({ isActive }) => 
                  `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ${
                    isActive 
                      ? 'bg-blue-900 hover:bg-blue-950' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                SIGNUP
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
