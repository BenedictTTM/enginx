'use client';

import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

type Props = {
  phone?: string;
  whatsapp?: string;
  className?: string;
};

export default function ContactMe({ phone = '+1234567890', whatsapp = '+1234567890', className = '' }: Props) {
  const waNumber = whatsapp.replace(/\D/g, '');

  return (
    <div className={`bg-[#071426] border border-gray-800/60 rounded-xl p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-2">Get in touch</h3>
      <p className="text-sm text-gray-300 mb-4">Prefer a quick chat? Call or message me on WhatsApp.</p>

      <div className="flex gap-3">
        <a
          href={`tel:${phone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-gray-700/60 hover:border-gray-600 text-gray-200 px-3 py-2 rounded-lg transition"
          aria-label="Call me directly"
        >
          <FaPhoneAlt className="w-4 h-4" />
          <span className="text-sm">Call Me</span>
        </a>

        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-600/30 px-3 py-2 rounded-lg transition"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-4 h-4" />
          <span className="text-sm">Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
