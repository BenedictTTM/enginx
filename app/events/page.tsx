import React from 'react';
import Events from '@/components/Events';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events — Enginx Workshops, Conferences & Meetups',
  description: 'Join us for modern software conferences, SaaS workshops, and tech community meetups organized by Enginx globally.',
};

export default function EventsPage() {
  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-gray-950 via-[#021128] to-blue-950 text-white pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden font-varela-round">
      <div className="absolute top-1/4 -left-32 w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 rounded-full filter blur-3xl opacity-10 animate-blob-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 rounded-full filter blur-3xl opacity-10 animate-blob-float animation-delay-4000"></div>

      <div className="relative z-10">
        <Events />
      </div>
    </div>
  );
}
