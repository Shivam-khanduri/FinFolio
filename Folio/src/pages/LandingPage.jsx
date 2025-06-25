import React from 'react';
import { useNavigate } from 'react-router-dom';
import BannerImage from '../assets/backgrounds/banner.png';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-100 flex flex-col">
      
      <Navbar />
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 flex-1">
        
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Your All-in-One <span className="text-blue-600">Stock Portfolio Tracker</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Track your investments, analyze performance, and make smarter financial decisions—all in real-time with FinFolio.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
              Get Started
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <img 
            src={BannerImage} 
            alt="FinFolio Illustration" 
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      <footer className="text-center text-gray-500 py-6 text-sm">
        © {new Date().getFullYear()} FinFolio. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
