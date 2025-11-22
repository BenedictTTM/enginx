import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import LightRays from '../components/ui/LightRays';
import Services from '../components/services';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
  title: 'Enginx — Fast, Secure & Scalable SaaS Solutions for Businesses Worldwide',
  description: 'Enginx delivers lightning-fast APIs, 99.99% uptime, enterprise-grade security, AI performance optimization, and scalable SaaS solutions for companies in Ghana and across the world.',
  keywords: ['enginx', 'saas in ghana', 'software company ghana', 'api hosting ghana', 'enterprise software africa', 'scalable software solutions', 'ai performance software', 'secure api service', 'cloud saas platform', 'ghana tech startup solutions', 'global saas provider'],
  openGraph: {
    title: 'Enginx — Fast & Reliable SaaS Solutions',
    description: 'High-performance APIs, AI optimization, enterprise security, and 99.99% uptime for businesses worldwide.',

    url: 'https://www.enginx.site',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.enginx.site',
  },
};

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-linear-to-b from-[#021128] via-blue-950 to-blue-900 text-white relative overflow-hidden text-sm sm:text-base"
    >
      {/* Animated Blob */}
      <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 rounded-full filter blur-3xl opacity-20 animate-blob-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 rounded-full filter blur-3xl opacity-20 animate-blob-float animation-delay-4000"></div>
      {/* Animated Blob */}
      <div className="absolute -z-10 top-1/4 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 rounded-full filter blur-3xl opacity-40 animate-[blob-float_18s_cubic-bezier(0.68,-0.55,0.27,1.55)_infinite]" />


      {/* Hero Section */}
      <div className="relative">
        {/* Light rays background for hero section only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <LightRays
            raysOrigin="bottom-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.5}
            rayLength={1.7}
            followMouse={true}
            mouseInfluence={0.2}
            noiseAmount={0.1}
            distortion={0.05}
            className="w-full h-full"
          />
        </div>

        <main id="home"
          className="max-w-4xl sm:max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-20 lg:py-28 text-center relative z-10 font-varela-round min-h-[85vh] md:min-h-screen flex flex-col justify-center pt-16 md:pt-0"
        >
        {/* Content with relative positioning to appear above light rays */}
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <span className="h-2 w-2 rounded-full bg-amber-400 inline-block glow-bip" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-gray-400 m-0">Best services to scale your business</p>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-5 leading-tight">
            Need software? No problem.
          </h1>

          <h2 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-semibold bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent mb-6 sm:mb-10">
            We build scalable solutions — the right way.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl md:max-w-2xl mx-auto mb-8 leading-relaxed">
            We build robust, scalable software systems designed to grow seamlessly with your business, ensuring high performance and efficiency at every stage.
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <Link href="/contact" className="w-full sm:w-auto text-center bg-white text-slate-900 px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">Get started</Link>
          <Link href="/about" className="w-full sm:w-auto text-center border-2 border-white px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full font-medium hover:bg-white hover:text-slate-900 transition-colors text-sm sm:text-base">Learn more</Link>
        </div>

      

        </main>
      </div>
      
      {/* Services Section */}
      <Services />
      {/* Projects Section */}
      <Projects />
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Enginx",
            url: "https://www.enginx.site",
            applicationCategory: "SaaS",
            operatingSystem: "All",
            provider: {
              "@type": "Organization",
              name: "Enginx",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </div>
  );
}