import React from 'react';
import HomeLayout from '../layouts/HomeLayout';

const Home = () => {
  return (
    <HomeLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Catálogo de Ofertas Laborales</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md flex justify-center items-center h-40">
              <h2 className="text-lg font-bold">Oferta {index + 1}</h2>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;