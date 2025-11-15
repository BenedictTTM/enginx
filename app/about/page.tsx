'use client';

import React from "react";

export default function AboutSection() {
  return (
    <div className="w-full  bg-linear-to-b from-gray-950 via-[#021128] to-blue-950 text-white text-white py-20 px-6 md:px-20 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Driving Innovation, Building <br /> Trust.
        </h1>
        <p className="text-base sm:text-xs md:text-sm lg:text-sm font-semibold bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent mb-6 sm:mb-10">
          We are a team of passionate innovators dedicated to creating software that
          simplifies complexity and empowers businesses to achieve their full potential.
        </p>
      </div>

      {/* Vision / Motto / Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
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
      <div className="space-y-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold">Why Choose Us</h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          Our commitment to excellence and innovation sets us apart. We deliver solutions that
          are not only powerful and intuitive but also secure and reliable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#0F223A] p-6 rounded-2xl space-y-3 border border-[#14304F]">
            <h4 className="text-lg font-semibold">Unmatched Performance</h4>
            <p className="text-gray-400 text-sm">
              Our systems run at maximum performance, ensuring speed, consistency, and
              reliability for all your operations.
            </p>
          </div>

          <div className="bg-[#0F223A] p-6 rounded-2xl space-y-3 border border-[#14304F]">
            <h4 className="text-lg font-semibold">Dedicated Support</h4>
            <p className="text-gray-400 text-sm">
              We provide expert, 24/7 support so you get the most out of our platform,
              whenever you need it.
            </p>
          </div>

          <div className="bg-[#0F223A] p-6 rounded-2xl space-y-3 border border-[#14304F]">
            <h4 className="text-lg font-semibold">Enterprise‑Grade Security</h4>
            <p className="text-gray-400 text-sm">
              Your data’s security is our top priority. We employ industry-leading practices to
              keep your information safe.
            </p>
          </div>

          <div className="bg-[#0F223A] p-6 rounded-2xl space-y-3 border border-[#14304F]">
            <h4 className="text-lg font-semibold">Continuous Innovation</h4>
            <p className="text-gray-400 text-sm">
              We are constantly evolving, releasing new features and improvements to keep you
              ahead of the curve.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Numbers */}
      <div className="space-y-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Our Impact in Numbers</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">5,000+</h3>
            <p className="text-gray-400 text-sm">Projects Completed</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold">1,200+</h3>
            <p className="text-gray-400 text-sm">Happy Customers</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold">42</h3>
            <p className="text-gray-400 text-sm">Countries Served</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-bold">99.9%</h3>
            <p className="text-gray-400 text-sm">Uptime Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
}
