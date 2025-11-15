'use client';

import React from "react";

export default function AboutSection() {
  return (
    <div className="relative w-full bg-linear-to-b from-gray-950 via-[#021128] to-blue-950 text-white pt-16 sm:pt-20 md:pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-20 space-y-16 md:space-y-20 overflow-hidden font-varela-round">
      {/* Animated Blob */}
      <div className="absolute top-1/4 -left-32 w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 rounded-full filter blur-3xl opacity-20 animate-blob-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 rounded-full filter blur-3xl opacity-20 animate-blob-float animation-delay-4000"></div>

      {/* Page Content Wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl sm:max-w-4xl mx-auto space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight">
            Driving Innovation, Building  Trust.
          </h1>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base font-semibold bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-10">
We create software that makes complex tasks simple and helps businesses reach their potential.
          </p>
        </div>

        {/* Vision / Motto / Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 text-center">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="text-gray-400 text-sm">
              To be the leading platform for seamless business innovation, empowering our
              partners with transformative tools that drive success.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Our Motto</h3>
            <p className="text-gray-400 text-sm">
              Simplicity, reliability, and impact. A simple and seamless experience you can
              trust to make work and life easier.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Our Values</h3>
            <p className="text-gray-400 text-sm">
              Integrity, customer-centricity, and continuous innovation are the pillars of our
              company culture.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-2">Why Choose Us</h2>
          <p className="text-center text-gray-300 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base mt-0">
            Our commitment to excellence and innovation sets us apart. We deliver solutions that are not only powerful and intuitive but also secure and reliable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-2xl sm:max-w-4xl mx-auto">
            <div className="bg-[#0F223A] p-4 sm:p-6 rounded-2xl space-y-2 sm:space-y-3 border border-[#14304F]">
              <h4 className="text-base sm:text-lg font-semibold">Unmatched Performance</h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                Our systems run at maximum performance, ensuring speed, consistency, and reliability for all your operations.
              </p>
            </div>

            <div className="bg-[#0F223A] p-4 sm:p-6 rounded-2xl space-y-2 sm:space-y-3 border border-[#14304F]">
              <h4 className="text-base sm:text-lg font-semibold">Dedicated Support</h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                We provide expert, 24/7 support so you get the most out of our platform, whenever you need it.
              </p>
            </div>

            <div className="bg-[#0F223A] p-4 sm:p-6 rounded-2xl space-y-2 sm:space-y-3 border border-[#14304F]">
              <h4 className="text-base sm:text-lg font-semibold">Enterprise‑Grade Security</h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                Your data’s security is our top priority. We employ industry-leading practices to keep your information safe.
              </p>
            </div>

            <div className="bg-[#0F223A] p-4 sm:p-6 rounded-2xl space-y-2 sm:space-y-3 border border-[#14304F]">
              <h4 className="text-base sm:text-lg font-semibold">Continuous Innovation</h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                We are constantly evolving, releasing new features and improvements to keep you ahead of the curve.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="mt-8 md:mt-12 mb-8 md:mb-12 space-y-8 md:space-y-10 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Our Impact in Numbers</h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-md sm:max-w-2xl md:max-w-5xl mx-auto">
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">5,000+</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Projects Completed</p>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">1,200+</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Happy Customers</p>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">42</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Countries Served</p>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">99.9%</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
