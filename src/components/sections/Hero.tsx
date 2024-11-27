import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to the Future
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Build something amazing with our cutting-edge platform designed for modern developers.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}