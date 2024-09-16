// src/layouts/HomeLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';

const HomeLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;