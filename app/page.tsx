import React from 'react';
import LightRays from '../components/ui/LightRays';
import Services from '../components/services';

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#021128] via-blue-950 to-blue-900 text-white relative overflow-hidden"
      style={{ fontSize: '13px' }}
    >
      {/* Load Varela Round for this session only */}
      <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto border-b border-[#D4AF37]/40">
        <div className="flex items-center gap-3">
          {/* Logo image - drop `enginx-logo.png` into the `public/` folder */}
          <img src="/engin.png" alt="Enginx" className="h-7 sm:h-8 object-contain" />
          <span className="sr-only">Enginx</span>
        </div>

        <div className="hidden md:flex 
        items-center gap-6">
          <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:inline-block text-amber-200 px-5 py-2 rounded-full transition-colors text-xs sm:text-sm">
            get started
          </button>
          <button aria-label="Open menu" className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        {/* Light rays background for hero section only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <LightRays
            raysOrigin="bottom-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.2}
            rayLength={1.6}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="w-full h-full"
          />
        </div>

        <main
          className="max-w-5xl sm:max-w-6xl mx-auto px-4 sm:px-8 py-15 sm:py-20 text-center relative z-10"
          style={{ fontFamily: "'Varela Round', sans-serif" }}
        >
        {/* Content with relative positioning to appear above light rays */}
        <div className="relative">
          <p className="text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">
            Best services to scale your business
          </p>

          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            Need software?  No problem.
          </h1>

          <h2 className="text-lg sm:text-xl md:text-4xl font-semibold bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent mb-10 sm:mb-12">
           We build scalable solutions — the right way.
          </h2>

          <p className="text-sm sm:text-sm text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
  We build robust, scalable software systems designed to grow seamlessly with your business, ensuring high performance and efficiency at every stage.
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-slate-900 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            get started
          </button>
          <button className="border-2 border-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium hover:bg-white hover:text-slate-900 transition-colors">
            learn More
          </button>
        </div>

      

        </main>
      </div>
      
      {/* Services Section */}
      <Services />
    </div>
  );
}