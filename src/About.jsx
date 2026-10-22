import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="w-64 bg-[#0f25e9] text-white hidden md:flex flex-col shadow-xl">
        <div className="p-6 border-b border-blue-800">
          <h2 className="text-2xl font-bold tracking-wide">CryptoApp</h2>
        </div>
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <Link to="/" className="flex items-center px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Mercado
          </Link>
          <Link to="/about" className="flex items-center px-4 py-3 bg-blue-800 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            About
          </Link>
          <Link to="/favoritos" className="flex items-center px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Favoritas
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b-2 pb-4">Acerca de esta App</h1>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <p className="text-lg text-gray-700">
            Esta es una aplicación de seguimiento de criptomonedas construida con React, Tailwind CSS y la API de CoinGecko.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;