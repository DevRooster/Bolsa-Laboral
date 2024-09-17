// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Bolsa Laboral</h1>
        <div className="space-x-1">
          <Link to="/login" className="text-white border border-transparent hover:border-white hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300 ease-in-out">
            Login
          </Link>
          <Link to="/register" className="text-white border border-transparent hover:border-white hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300 ease-in-out">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;